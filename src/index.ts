import { initDB } from "./storage/index";
import {
  addDocument,
  getDocument,
  updateDocument,
} from "./storage/documentStore";
import { addOperation, getOperations } from "./storage/operationStore";

async function runTest() {
  await initDB();

  console.log("DB Initialized");

  await addDocument({
    id: 1,
    title: "Test Doc",
    content: "Hello",
    updatedAt: Date.now(),
  });

  console.log("Document Added");

  await addOperation({
    opId: "op1",
    docId: 1,
    userId: "user-1",
    type: "insert",
    position: 5,
    value: " World",
    timestamp: Date.now(),
  });

  console.log("Operation Added");

  const doc = await getDocument(1);

  if (!doc) {
    console.error("Document not found");
    return;
  }

  console.log("Fetched Doc:", doc);

  const ops = await getOperations(1);
  console.log("Operations:", ops);

  let content = doc.content;

  ops.forEach((op) => {
    if (op.type === "insert") {
      content =
        content.slice(0, op.position) + op.value + content.slice(op.position);
    }
  });

  console.log("Updated Content:", content);

  await updateDocument({
    ...doc,
    content,
    updatedAt: Date.now(),
  });

  console.log("Document Updated");
}
await runTest()
import { initDB } from "../storage/index.js";
import {
    addDocument,
    getDocument,
    updateDocument,
} from "../storage/documentStore.js";
import { addOperation, getOperations } from "../storage/operationStore.js";
import type { Op } from "../types/storageTypes.js";

export async function runTest() {
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
        operationId: "op1",
        documentId: 1,
        userId: "user-1",
        type: "insert",
        position: { row: 5, column: 5 },
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
    let lines = content.split("\n");
    ops.forEach((op: Op) => {
        if (op.type === "insert") {
            const row = op.position.row;
            const col = op.position.column;

            // Ensure the row exists
            if (row >= 0 && row < lines.length) {
                const line = lines[row] ?? "";
                const safeCol = Math.min(col, line.length);
                lines[row] =
                    line.slice(0, safeCol) + op.value + line.slice(safeCol);
            } else {
                // Optionally expand lines if row is beyond current length
                while (lines.length <= row) {
                    lines.push("");
                }
                lines[row] = op.value;
            }
        }
    });
    content = lines.join("\n");

    console.log("Updated Content:", content);

    await updateDocument({
        ...doc,
        content,
        updatedAt: Date.now(),
    });

    console.log("Document Updated");
}

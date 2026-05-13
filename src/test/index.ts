import { initDB } from "../storage/index.js";
import {
    createDocument,
    getDocument,
    updateDocument,
} from "../storage/documentStore.js";
import { addOperation, getOperations } from "../storage/operationStore.js";
import type { Operations } from "../types/storageTypes.js";
import { addUser, getUser } from "../storage/userStore.js";

export async function runTest() {
    try {
        await initDB();

        console.log("DB Initialized");
    } catch (err) {
        console.error("DB initialization failed", err);
    }

    try {
        await createDocument("Doc1");

        console.log("Document Added");
    } catch (err) {
        console.log("Failed to add Document", err);
    }

    try {
        await addOperation({
            operationId: "op1",
            documentId: "1",
            username: "user-1",
            type: "insert",
            position: { row: 5, column: 5 },
            value: " World",
            timestamp: Date.now(),
        });

        console.log("Operation Added");
    } catch (err) {
        console.log("Failed to add Operation", err);
    }

    try {
        const doc = await getDocument("Doc1");

        if (!doc) {
            throw new Error ("Document not Found")
        }

        console.log("Fetched Doc:", doc);

        const ops = await getOperations(1);
        console.log("Operations:", ops);

        let content = doc.content;
        let lines = content.split("\n");
        ops.forEach((op: Operations) => {
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
    } catch (err) {
        console.error("Document get/update issue", err);
    }
    try {
        await addUser("Jenith");
    } catch (err) {
        console.error("Failed to add user", err);
    }

    try {
        const user = await getUser("Jenith");

        if (!user) {
            throw new Error("User not Found")
        }

        console.log("Fetched user:", user);
    } catch (err) {
        console.error(err);
    }
}

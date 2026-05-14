import { getDocument, updateDocument } from "../storage/documentStore.js";
import { editorState } from "../types/state.js";
import type { Document, Operations } from "../types/storageTypes.js";
import { applyOperation } from "./operations.js";
import { generateRandomId } from "./randomIdGenerator.js";

export function getInverseOperation(operation: Operations): Operations {
    let inverseType: "insert" | "delete";

    if (operation.type === "insert") {
        inverseType = "delete";
    } else {
        inverseType = "insert";
    }

    return {
        operationId: generateRandomId(),
        documentId: operation.documentId,
        username: operation.username,
        type: inverseType,
        position: operation.position,
        value: operation.value,
        timestamp: Date.now(),
    };
}

export function pushUndo(operation: Operations) {
    
    editorState.currentDocument.undoStack.push(operation);
}

export function pushRedo(operation: Operations) {
    editorState.currentDocument.redoStack.push(operation);
}

export function clearRedo() {
    editorState.currentDocument.redoStack = [];
}
export async function undo() {
    const operation = editorState.currentDocument.undoStack.pop();

    if (!operation) return;

    const redoOperation = getInverseOperation(operation);
    await applyOperation(operation, {
        broadcast: true,
        saveHistory: false,
    });
    pushRedo(redoOperation);
}

export async function redo() {
    const operation = editorState.currentDocument.redoStack.pop();
    if (!operation) return;
    const undoOperation = getInverseOperation(operation);
    await applyOperation(operation, {
        broadcast: true,
        saveHistory: false,
    });

    pushUndo(undoOperation);
}

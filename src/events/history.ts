import { editorState } from "../types/state.js";
import type { Operations } from "../types/storageTypes.js";
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
    editorState.undoStack.push(operation);
}

export function pushRedo(operation: Operations) {
    editorState.redoStack.push(operation);
}

export function clearRedo() {
    editorState.redoStack = [];
}

export function undo() {
    console.log("Hello");
    const operation = editorState.undoStack.pop();

    if (!operation) return;

    const redoOperation = getInverseOperation(operation);
    applyOperation(operation, {
        broadcast: true,
        saveHistory: false,
    });

    pushRedo(redoOperation);
}

export function redo() {
    const operation = editorState.redoStack.pop();
    if (!operation) return;
    const undoOperation = getInverseOperation(operation);
    applyOperation(operation, {
        broadcast: true,
        saveHistory: false,
    });

    pushUndo(undoOperation);
}

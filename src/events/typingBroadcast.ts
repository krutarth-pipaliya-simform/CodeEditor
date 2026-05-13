import { getCurrentFile } from "../render/renderCurrentFile.js";
import { editorState } from "../types/state.js";
import type { Operations } from "../types/storageTypes.js";
import { applyOperation } from "./operations.js";

export const channel = new BroadcastChannel("code-editor-sync");

export function sendOperation(operation: Operations) {
    channel.postMessage({
        type: "operation",
        payload: operation,
        file: getCurrentFile(),
    });
}

channel.onmessage = (event) => {
    const data = event.data;
    if (data.type !== "operation") return;
    const operation: Operations = data.payload;
    if (editorState.appliedOperations.has(operation.operationId)) {
        return;
    }
    if (getCurrentFile() === data.file)
        applyOperation(operation, {
            broadcast: false,
            saveHistory: false,
        });
};

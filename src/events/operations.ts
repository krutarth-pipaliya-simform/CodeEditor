import { editorState } from "../types/state.js";
import type { ApplyOptions, Operations } from "../types/storageTypes.js";
import { sendOperation } from "./typingBroadcast.js";
import { clearRedo, getInverseOperation, pushUndo } from "./history.js";
import { positionToIndex } from "./utils.js";
import {
    getCurrentFile,
    renderCurrentFile,
} from "../render/renderCurrentFile.js";
import { updateDocument } from "../storage/documentStore.js";

const editor = document.querySelector<HTMLTextAreaElement>("#editor");

export function applyOperation(
    operation: Operations,
    options: ApplyOptions = {},
) {
    const { broadcast = true, saveHistory = true } = options;
    const document = editorState.currentDocument;
    let content = document.content;
    const index = positionToIndex(
        content,
        operation.position.row,
        operation.position.column,
    );
    switch (operation.type) {
        case "insert": {
            content =
                content.slice(0, index) +
                operation.value +
                content.slice(index);
            break;
        }

        case "delete": {
            content =
                content.slice(0, index) +
                content.slice(index + operation.value.length);
            break;
        }

        case "update": {
            content = operation.value;
            break;
        }
    }

    document.content = content;
    document.updatedAt = Date.now();
    editorState.appliedOperations.add(operation.operationId);

    if (saveHistory) {
        const inverse = getInverseOperation(operation);
        pushUndo(inverse);
        clearRedo();
        // updateDocument(document)
        // renderCurrentFile()
        sendOperation(operation);
    }
    renderEditor();
    if (broadcast) {
        sendOperation(operation);
    }
}

export function renderEditor() {
    if (editor !== null) editor.value = editorState.currentDocument.content;
}

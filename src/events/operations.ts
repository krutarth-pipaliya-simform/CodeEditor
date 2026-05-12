
import { editorState } from "../types/state.js";
import type { Operations } from "../types/storageTypes.js";
import { sendOperation } from "./broadcast.js";
import { positionToIndex } from "./utils.js";

const editor = document.querySelector<HTMLTextAreaElement>("#editor")!;

export function applyOperation(
    operation: Operations,
    shouldBroadcast = true
) {
    const document = editorState.currentDocument;

    let content = document.content;

    const index =   positionToIndex(
        content,
        operation.position.row,
        operation.position.column
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

    renderEditor();

    if (shouldBroadcast) {
        sendOperation(operation);
    }
}

export function renderEditor() {
    editor.value = editorState.currentDocument.content;
}
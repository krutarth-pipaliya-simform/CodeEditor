import { getCurrentFile } from "../render/renderCurrentFile.js";
import { editorState } from "../types/state.js";
import type { Operations } from "../types/storageTypes.js";
import { applyOperation } from "./operations.js";
import { generateRandomId } from "./randomIdGenerator.js";
import { getRowColumn } from "./utils.js";

const editor = document.querySelector<HTMLTextAreaElement>("#editor")!;

const username = sessionStorage.getItem("username") || "anonymous-user";

let previousValue = "";

export function setupEditorEvents() {
    previousValue = editor.value;
    editor.addEventListener("input", handleInput);
}
export function resetPreviousValue() {
    previousValue = editorState.currentDocument.content;
}
function handleInput() {
    const currentValue = editor.value;

    const cursorIndex = editor.selectionStart;

    if (currentValue.length > previousValue.length) {
        const insertedChar = currentValue[cursorIndex - 1];

        const position = getRowColumn(previousValue, cursorIndex - 1);

        const operation: Operations = {
            operationId: generateRandomId(),
            documentId: getCurrentFile(),
            username,
            type: "insert",
            position,
            value: insertedChar!,
            timestamp: Date.now(),
        };

        applyOperation(operation);
    } else if (currentValue.length < previousValue.length) {
        const position = getRowColumn(previousValue, cursorIndex);

        const deletedChar = previousValue.slice(
            cursorIndex,
            cursorIndex + (previousValue.length - currentValue.length),
        );
        const operation: Operations = {
            operationId: generateRandomId(),
            documentId: getCurrentFile(),
            username,
            type: "delete",
            position,
            value: deletedChar,
            timestamp: Date.now(),
        };

        applyOperation(operation);
    }
    previousValue = editorState.currentDocument.content;
}

import { getDocument } from "../storage/documentStore.js";
import { editorState, setContent } from "../types/state.js";

let currentFile = "";

export async function renderCurrentFile() {
    const codeArea = document.querySelector(".code-area");
    if (!(codeArea instanceof HTMLTextAreaElement)) return;
    const currentDocument = await getDocument(getCurrentFile());
    if (!currentDocument) return;
    currentDocument.undoStack ??= [];
    currentDocument.redoStack ??= [];
    await setContent();
    codeArea.value = editorState.currentDocument.content;
}

export function getCurrentFile() {
    return currentFile;
}

export async function setCurrentFile(fileName: string) {
    currentFile = fileName;
    const currentFileDiv = document.querySelector(".current-file-name");
    if (!(currentFileDiv instanceof HTMLDivElement))
        throw new Error("Current file div not found");
    currentFileDiv.textContent = fileName;
    await renderCurrentFile();
}

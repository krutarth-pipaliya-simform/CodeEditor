import { getDocument } from "../storage/documentStore.js";

let currentFile = "";

export async function renderCurrentFile() {
    const codeArea = document.querySelector(".code-area");
    if (!(codeArea instanceof HTMLDivElement)) return;
    const currentDocument = await getDocument(getCurrentFile());
    if (!currentDocument) return;
    codeArea.innerHTML = currentDocument.content;
}

export function getCurrentFile() {
    return currentFile;
}

export async function setCurrentFile(fileName: string) {
    currentFile = fileName;
    await renderCurrentFile();
}

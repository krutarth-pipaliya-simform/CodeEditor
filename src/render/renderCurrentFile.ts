import { getDocument } from "../storage/documentStore.js";

let currentFile = "";

export async function renderCurrentFile() {
    const codeArea = document.querySelector(".code-area");
    console.log("in render", codeArea);
    if (!(codeArea instanceof HTMLTextAreaElement)) return;
    const currentDocument = await getDocument(getCurrentFile());
    if (!currentDocument) return;
    codeArea.value = currentDocument.content;
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

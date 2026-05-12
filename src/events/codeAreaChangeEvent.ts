import { getCurrentFile } from "../render/renderCurrentFile.js";
import { getDocument, updateDocument } from "../storage/documentStore.js";

export function codeAreaChangeEvent() {
    const codeArea = document.querySelector(".code-area");
    if (!(codeArea instanceof HTMLDivElement)) return;
    codeArea.addEventListener("input", async (e) => {
        const currentDocument = await getDocument(getCurrentFile());
        if (!currentDocument) return;
        currentDocument.content = codeArea.textContent;
        updateDocument(currentDocument);
    });
}

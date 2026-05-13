import { getCurrentFile } from "../render/renderCurrentFile.js";
import { getDocument, updateDocument } from "../storage/documentStore.js";

export function codeAreaChangeEvent() {
    const codeArea = document.querySelector(".code-area");
    if (!(codeArea instanceof HTMLTextAreaElement)) return;
    codeArea.addEventListener("input", async (e) => {
        const currentDocument = await getDocument(getCurrentFile());
        if (!currentDocument) return;
        currentDocument.content = codeArea.value;
        console.log(currentDocument.content, currentDocument);
        await updateDocument(currentDocument);
    });
}

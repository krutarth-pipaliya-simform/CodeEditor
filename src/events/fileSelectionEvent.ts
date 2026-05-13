import { setCurrentFile } from "../render/renderCurrentFile.js";

export function fileSelectionEvent() {
    const list = document.querySelector(".file-list");
    if (!(list instanceof HTMLUListElement)) return;
    list.addEventListener("click", async (e) => {
        if (
            !(e.target instanceof HTMLLIElement) ||
            !e.target.classList.contains("file-list-item")
        ) {
            return;
        }
        clearSelectedFileClass();
        e.target.classList.add("selected-file");
        await setCurrentFile(e.target.textContent);
    });
}

function clearSelectedFileClass() {
    const selected = document.querySelector(".selected-file");
    selected?.classList.remove("selected-file");
}

import { createLi } from "../events/promptButtonEvent.js";
import { getAllDocuments } from "../storage/documentStore.js";
import { getCurrentFile, setCurrentFile } from "./renderCurrentFile.js";

export async function renderFiles() {
    const list = document.querySelector(".file-list");
    const res = await getAllDocuments();
    if (!res) return;
    res.forEach(async (ele) => {
        const li = createLi(ele.title);
        if (!getCurrentFile()) {
            await setCurrentFile(ele.title);
            li.classList.add("selected-file");
        }
        list?.appendChild(li);
    });
}

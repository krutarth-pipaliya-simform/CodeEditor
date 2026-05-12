import { createDocument } from "../storage/documentStore.js";

export function promptButtonEvent() {
    const button = document.getElementById("ok-btn");
    if (!(button instanceof HTMLButtonElement)) return;
    button.addEventListener("click", async () => {
        const input = document.getElementById("promptInput");
        const list = document.querySelector(".file-list");
        const prompt = document.getElementById("custom-prompt");

        if (
            !(prompt instanceof HTMLDivElement) ||
            !(input instanceof HTMLInputElement) ||
            !(list instanceof HTMLUListElement)
        )
            throw new Error("Please check th DOM structure.");
        const fileName = input.value;
        if (checkDuplicateFileName(fileName)) {
            alert(
                `File with the ${fileName} name already exists please change the name`,
            );
            return;
        }
        if (fileName.length < 3) {
            alert("Min length of 3 required.");
            return;
        }
        try {
            await createDocument(fileName);
        } catch (error) {
            console.log("error", error);
        }

        list.appendChild(createLi(fileName));
        prompt.classList.add("hidden");
    });
}

export function createLi(fileName: string) {
    const liElement = document.createElement("li");
    liElement.classList.add("file-list-item");
    liElement.textContent = fileName;
    return liElement;
}

function checkDuplicateFileName(fileName: string) {
    const files = document.querySelectorAll(".file-list-item");
    for (const ele of files) {
        if (ele.textContent === fileName) {
            return true;
        }
    }
    return false;
}

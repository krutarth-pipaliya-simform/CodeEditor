import { createDocument } from "../storage/documentStore.js";

export function promptButtonEvent() {
    const button = document.getElementById("add-file");
    console.log(button);
    if (!(button instanceof HTMLButtonElement)) return;
    button.addEventListener("click", async () => {
        const input = document.getElementById("file-input");
        const list = document.querySelector(".file-list");
        const prompt = document.getElementById("custom-prompt-file");

        if (
            !(prompt instanceof HTMLDialogElement) ||
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
        prompt.close();
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

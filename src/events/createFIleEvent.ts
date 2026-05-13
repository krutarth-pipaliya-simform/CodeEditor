export function createFileEvent() {
    const createButton = document.querySelector(".create-file-button");
    if (!(createButton instanceof HTMLButtonElement)) return;
    createButton.addEventListener("click", async () => {
        console.log("called");
        const prompt = document.getElementById("custom-prompt-file");
        if (!(prompt instanceof HTMLDialogElement)) return;
        console.log("Hello")
        prompt.showModal()
    });
}

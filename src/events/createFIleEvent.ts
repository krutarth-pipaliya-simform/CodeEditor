export function createFileEvent() {
    const createButton = document.querySelector(".create-file-button");
    if (!(createButton instanceof HTMLButtonElement)) return;
    createButton.addEventListener("click", async () => {
        const prompt = document.getElementById("custom-prompt");
        if (!(prompt instanceof HTMLDivElement)) return;
        prompt.classList.remove("hidden");
    });
}

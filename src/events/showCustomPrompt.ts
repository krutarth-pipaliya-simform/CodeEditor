import { generateUser } from "./generateUser.js";

export function showCustomPrompt() {
    document.addEventListener("DOMContentLoaded", () => {
        const dialog = <HTMLDialogElement>document.getElementById("customPrompt");
        const input = <HTMLInputElement>document.getElementById("promptInput");
        const okBtn = <HTMLButtonElement>document.getElementById("ok-btn");

        // Open dialog
        dialog.showModal();

        // OK button click
        okBtn.addEventListener("click", () => {
            const value = input.value.trim();
            if (value) {
                dialog.close();
                generateUser(value);
            } else {
                alert("Please enter a valid name.");
            }
        });
    });
}

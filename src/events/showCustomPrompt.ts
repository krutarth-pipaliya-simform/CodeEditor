import { generateUser } from "./generateUser.js";

export function showCustomPrompt() {
    document.addEventListener("DOMContentLoaded", () => {
        const overlay = <HTMLDivElement>document.getElementById("customPrompt");
        const input = <HTMLInputElement>document.getElementById("promptInput");
        const okBtn = <HTMLButtonElement>document.getElementById("ok-btn");

        // Show prompt on page load
        overlay.style.display = "flex";

        // OK button click
        okBtn.addEventListener("click", () => {
            const value = input.value.trim();
            if (value) {
                overlay.style.display = "none";
                generateUser(value);
            } else {
                alert("Please enter a valid name.");
            }
        });
    });
}

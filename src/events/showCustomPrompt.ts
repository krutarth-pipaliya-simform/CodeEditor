import { generateUser } from "./generateUser.js";
import { promptButtonEvent } from "./promptButtonEvent.js";
import { setUserInitials } from "./showUserInitials.js";

export function showCustomPrompt() {
    document.addEventListener(
        "DOMContentLoaded",
        () => {
            const dialog = document.getElementById("custom-prompt");
            const input = document.getElementById("prompt-input");
            const okBtn = document.getElementById("ok-btn");
            if (!(dialog instanceof HTMLDialogElement)) {
                throw new Error("Dialog element not found");
            }
            if (!(input instanceof HTMLInputElement)) {
                throw new Error("Dialog element not found");
            }
            if (!(okBtn instanceof HTMLButtonElement)) {
                throw new Error("Dialog element not found");
            }
            // Open dialog
            dialog.showModal();

            // OK button click
            const handleokBtn = () => {
                const value = input.value.trim();
                if (value) {
                    dialog.close();
                    //on close of broadcast channel remove this user.
                    generateUser(value);
                    setUserInitials();
                } else {
                    alert("Please enter a valid name.");
                }
            };
            okBtn.addEventListener("click", handleokBtn);
        },
        { once: true },
    );
}

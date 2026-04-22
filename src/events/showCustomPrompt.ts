import { generateUser } from "./generateUser.js";

function generateRandomId(): string {
  return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}
export function showCustomPrompt() {
  document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("customPrompt") as HTMLDivElement;
    const input = document.getElementById("promptInput") as HTMLInputElement;
    const okBtn = document.getElementById("okBtn") as HTMLButtonElement;

    // Show prompt on page load
    overlay.style.display = "flex";

    // OK button click
    okBtn.addEventListener("click", () => {
      const value = input.value.trim();
      if (value) {
        overlay.style.display = "none";
        let userId=value + generateRandomId()
        generateUser(userId)
      } else {
        alert("Please enter a valid name.");
      }
    });
  });
}

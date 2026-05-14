import { removeHighlight } from "./searchButtonOnClick.js";

export default function endSearchButtonOnClick() {
    const button = document.querySelector(".file-search-end-button");
    if (button instanceof HTMLButtonElement) {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const input = document.querySelector(".file-search-input");
            if (input instanceof HTMLInputElement) {
                input.value = "";
            }
            removeHighlight();
            button.style.display = "none";
        });
    }
}

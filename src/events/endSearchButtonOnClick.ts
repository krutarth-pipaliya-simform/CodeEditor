import { removeHighlight } from "./searchButtonOnClick.js";

export default function endSearchButtonOnClick() {
    const button = document.querySelector(".file-search-end-button");
    if (button instanceof HTMLButtonElement) {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            removeHighlight();
            console.log(button.classList);
            button.style.display = "none";
        });
    }
}

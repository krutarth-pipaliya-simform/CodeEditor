export default function keyboardEvents() {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key.toLowerCase() === "f") {
            e.preventDefault();
            const input = document.querySelector(".file-search-input");
            if (input instanceof HTMLInputElement) input.focus();
        } else if (e.ctrlKey && e.key.toLowerCase() === "b") {
            e.preventDefault();
            const aside = document.querySelector("aside");
            aside?.classList.toggle("hidden");
        } else if (
            e.key === "Enter" &&
            document.activeElement ==
                document.querySelector(".file-search-input")
        ) {
            e.preventDefault();
            const button = document.querySelector(".file-search-button");
            button?.dispatchEvent(new Event("click"));
        }
    });
}

import highlightChangeEvent from "./highlighChangeEvent.js";

export default function searchButtonOnClick() {
    const button = document.querySelector(".file-search-button");
    button?.addEventListener("click", (e) => {
        e.preventDefault();
        removeHighlight();
        const input = document.querySelector(".file-search-input");
        if (input instanceof HTMLInputElement) {
            const value = input.value;
            addHilghlight(value);
        }
    });
}

function addHilghlight(query: string) {
    const lines = document.querySelectorAll(".line-content");
    for (let line of lines) {
        line.innerHTML = line.innerHTML.replaceAll(
            query,
            `<span class="highlighted" data-text="${query}">${query}</span>`,
        );
    }
    const highlights = document.querySelectorAll(".highlighted");
    for (let highlight of highlights) {
        if (highlight instanceof HTMLSpanElement) {
            console.log("added");
            observer.observe(highlight, {
                childList: true,
                subtree: true,
                characterData: true,
            });
        }
    }
}

export function removeHighlight(span?: HTMLSpanElement) {
    if (span) {
        const parent = span.parentElement;
        const text = span.firstChild;
        if (text) {
            parent?.insertBefore(text, span);
        }
        parent?.removeChild(span);
        parent?.normalize();
        return;
    }

    const highlights = document.querySelectorAll(".highlighted");
    for (let highlight of highlights) {
        const parent = highlight.parentElement;
        const text = highlight.firstChild;
        if (text) {
            parent?.insertBefore(text, highlight);
        }
        parent?.removeChild(highlight);
    }
}

const observer = new MutationObserver((mutationRecords) => {
    if (mutationRecords[0]?.target.parentElement)
        highlightChangeEvent(mutationRecords[0]?.target.parentElement);
});

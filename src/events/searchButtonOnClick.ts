let currentMatchIndex = 0;
let matches: number[] = [];
let previousQuery = "";

export default function searchButtonOnClick() {
    const button = document.querySelector(".file-search-button");
    button?.addEventListener("click", (e) => {
        e.preventDefault();
        const input = document.querySelector(".file-search-input");
        if (input instanceof HTMLInputElement) {
            const value = input.value;
            addHilghlight(value);
        }
        const endSearchButton = document.querySelector(
            ".file-search-end-button",
        );
        if (endSearchButton instanceof HTMLButtonElement) {
            endSearchButton.style.display = "inline-flex";
        }
    });
}

function addHilghlight(query: string) {
    const code = document.querySelector(".code-area");
    if (code instanceof HTMLTextAreaElement) {
        if (previousQuery !== query) {
            matches = [];
            currentMatchIndex = 0;
            previousQuery = query;
            let startIndex = 0;
            while (true) {
                const foundIndex = code.value.indexOf(query, startIndex);
                if (foundIndex === -1) break;
                matches.push(foundIndex);
                startIndex = foundIndex + query.length;
            }
        }
        // No matches found
        if (matches.length === 0) return;
        // Go back to first match
        if (currentMatchIndex >= matches.length) {
            currentMatchIndex = 0;
        }
        const start = matches[currentMatchIndex];
        if (start != undefined) {
            code.focus();
            code.setSelectionRange(start, start + query.length);
        }
        // Move to next match for next click
        currentMatchIndex++;
    }
}

export function removeHighlight() {
    const code = document.querySelector(".code-area");

    if (code instanceof HTMLTextAreaElement) {
        code.setSelectionRange(0, 0);
        code.blur();
    }
    // Reset search state
    currentMatchIndex = 0;
    matches = [];
    previousQuery = "";
}

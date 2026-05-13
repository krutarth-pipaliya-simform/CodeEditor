export default function lineNumberChangeEvent() {
    const codeArea = document.querySelector(".code-area");
    if (codeArea instanceof HTMLDivElement) {
        observer.observe(codeArea, {
            childList: true,
        });
    }
}

const observer = new MutationObserver((MutationRecords) => {
    let ul = document.querySelector(".line-numbers-column-list");
    let lastLi = ul?.lastElementChild;
    if (lastLi instanceof HTMLLIElement) {
        const codeArea = document.querySelector(".code-area");
        let lastNumber = lastLi.dataset.lineNumber
            ? +lastLi.dataset.lineNumber
            : 0;
        if (
            codeArea &&
            codeArea.childElementCount &&
            lastNumber > codeArea.childElementCount
        )
            lastLi.remove();
        else if (
            codeArea &&
            codeArea.childElementCount &&
            lastNumber < codeArea.childElementCount
        ) {
            const newLi = document.createElement("li");
            newLi.classList.add("line-number");
            newLi.dataset.lineNumber = String(codeArea.childElementCount);
            newLi.innerText = String(codeArea.childElementCount);
            lastLi.after(newLi);
        }
    }
});

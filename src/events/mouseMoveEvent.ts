import { channel } from "./broadCast.js";

export function mouseMoveEvent() {
    document.addEventListener("pointermove", (e) => {
        const codeArea = document.querySelector(".content-area");
        if (!codeArea) return;
        const rect = codeArea.getBoundingClientRect();
        if (
            rect.left > e.clientX ||
            rect.right < e.clientX ||
            rect.top > e.clientY ||
            rect.bottom < e.clientY
        )
            return;

        channel.postMessage({
            top: e.clientY,
            left: e.clientX,
            documentName: "random",
            user: "krutarth",
        });
    });
}

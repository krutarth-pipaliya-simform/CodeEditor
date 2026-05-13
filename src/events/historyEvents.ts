import { redo, undo } from "./history.js";

export function setupHistoryEvents() {
    const undoBtn = document.querySelector<HTMLButtonElement>("#undo");
    const redoBtn = document.querySelector<HTMLButtonElement>("#redo");
    undoBtn?.addEventListener("click", undo);
    redoBtn?.addEventListener("click", redo);
}

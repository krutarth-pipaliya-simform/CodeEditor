import { removeHighlight } from "./searchButtonOnClick.js";

export default function highlightChangeEvent(span: HTMLSpanElement) {
    if (span.dataset.text !== span.innerHTML) removeHighlight(span);
}

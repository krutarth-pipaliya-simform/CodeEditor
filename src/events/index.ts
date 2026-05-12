import { setupEditorEvents } from "./editorEvents.js";
import endSearchButtonOnClick from "./endSearchButtonOnClick.js";
import { setupHistoryEvents } from "./historyEvents.js";
import lineNumberChangeEvent from "./lineNumberChangeEvent.js";
import { renderEditor } from "./operations.js";
import searchButtonOnClick from "./searchButtonOnClick.js";
import toggleSidebarEvent from "./toggleSidebarEvent.js";

export function startEvents() {
    toggleSidebarEvent();
    searchButtonOnClick();
    endSearchButtonOnClick();
    lineNumberChangeEvent();
    renderEditor();
    setupEditorEvents();
    setupHistoryEvents()
}

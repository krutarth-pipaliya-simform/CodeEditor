import endSearchButtonOnClick from "./endSearchButtonOnClick.js";
import lineNumberChangeEvent from "./lineNumberChangeEvent.js";
import searchButtonOnClick from "./searchButtonOnClick.js";
import toggleSidebarEvent from "./toggleSidebarEvent.js";

export function startEvents() {
    toggleSidebarEvent();
    searchButtonOnClick();
    endSearchButtonOnClick();
    lineNumberChangeEvent();
}

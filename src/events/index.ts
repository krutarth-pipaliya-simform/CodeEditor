import endSearchButtonOnClick from "./endSearchButtonOnClick.js";
import lineNumberChangeEvent from "./lineNumberChangeEvent.js"
import searchButtonOnClick from "./searchButtonOnClick.js";
import { showCustomPrompt } from "./showCustomPrompt.js";
import { setUserInitials } from "./showUserInitials.js";
import toggleSidebarEvent from "./toggleSidebarEvent.js";

export function startEvents() {
    toggleSidebarEvent();
    searchButtonOnClick();
    endSearchButtonOnClick();
    lineNumberChangeEvent();
    showCustomPrompt()
    setUserInitials();
}

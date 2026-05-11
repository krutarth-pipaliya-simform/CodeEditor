import endSearchButtonOnClick from "./endSearchButtonOnClick.js";
import keyboardEvents from "./keyboardEvents.js";
import searchButtonOnClick from "./searchButtonOnClick.js";
import toggleSidebarEvent from "./toggleSidebarEvent.js";

export function startEvents() {
    toggleSidebarEvent();
    searchButtonOnClick();
    endSearchButtonOnClick();
    keyboardEvents();
}

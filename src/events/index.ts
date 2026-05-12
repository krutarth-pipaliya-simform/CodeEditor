import { createBroadcast } from "./broadCast.js";
import { createFileEvent } from "./createFIleEvent.js";
import endSearchButtonOnClick from "./endSearchButtonOnClick.js";
import keyboardEvents from "./keyboardEvents.js";
import { mouseMoveEvent } from "./mouseMoveEvent.js";
import { promptButtonEvent } from "./promptButtonEvent.js";
import searchButtonOnClick from "./searchButtonOnClick.js";
import toggleSidebarEvent from "./toggleSidebarEvent.js";

export function startEvents() {
    toggleSidebarEvent();
    searchButtonOnClick();
    endSearchButtonOnClick();
    keyboardEvents();
    createBroadcast();
    mouseMoveEvent();
    createFileEvent();
    promptButtonEvent();
}

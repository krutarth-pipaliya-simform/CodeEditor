import { startEvents } from "./events/index.js";
import { setupPresenceListener } from "./events/presence.js";
import startRendering from "./render/startRendering.js";
import { showCustomPrompt } from "./events/showCustomPrompt.js";
import { initDB } from "./storage/index.js";

setupPresenceListener();
showCustomPrompt();
await initDB();
startEvents();
await startRendering();

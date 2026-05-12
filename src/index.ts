import { startEvents } from "./events/index.js";
import { showCustomPrompt } from "./events/showCustomPrompt.js";
import { setUserInitials } from "./events/showUserInitials.js";
import { initDB } from "./storage/index.js";
showCustomPrompt();
await initDB();
startEvents();

import { startEvents } from "./events/index.js";
import { initDB } from "./storage/index.js";

await initDB();
startEvents();

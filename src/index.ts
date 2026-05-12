import { startEvents } from "./events/index.js";
import startRendering from "./render/startRendering.js";
import { initDB } from "./storage/index.js";
await initDB();
startEvents();
await startRendering();

import { runTest } from "./test/index.js";
import { startEvents } from "./events/index.js";
import { initDB } from "./storage/index.js";

startEvents();
await initDB();

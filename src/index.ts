import { runTest } from "./test/index.js";
import { startEvents } from "./events/index.js";

try{
    await runTest();
    startEvents();
}
catch(err)
{
    console.error("runTest failed:", err);
}




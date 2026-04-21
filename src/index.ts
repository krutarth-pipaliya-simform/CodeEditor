import { runTest } from "./test/index.js";

try{
    await runTest();
}
catch(err)
{
    console.error("runTest failed:", err);
}

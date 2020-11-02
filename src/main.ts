import * as express from "express";
import { env } from "process";
import { router } from "./routes/api";

function initialize(port: string): void {
    console.log(`Running website API service on port ${port}`);
}

function main(): void {
    const app = express();
    const port = env.PORT;

    if (!port) {
        console.error("No PORT environment variable defined");
        process.exit(1);
    }
    
    app.use("/api/v1", router);
    
    app.listen(port, () => { initialize(port); });
}

main();

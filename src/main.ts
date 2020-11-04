import * as express from "express";
import * as cors from "cors";
import { env } from "process";
import { router } from "./routes/api";

function initialize(port: string): void {
    console.log(`Running website API service on port ${port}`);
}

function main(): void {
    const port = env.PORT;

    if (!port) {
        console.error("No PORT environment variable defined");
        process.exit(1);
    }
    
    const app = express();

    app.use(cors())

    app.use("/api/v1", router);
    
    app.listen(port, () => { initialize(port); });
}

main();

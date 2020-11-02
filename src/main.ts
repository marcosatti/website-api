import express from "express";
import { env } from "process";
import { router as blog_router } from "./routes/blog";
import { router as projects_router } from "./routes/projects";

function initialize(port: string): void {
    console.log(`Running website API service on port ${port}`);
}

function main(): void {
    const app = express();
    const port = env.PORT;

    if (port === undefined) {
        console.error("No PORT environment variable defined");
        process.exit(1);
    }
    
    app.use("/blog", blog_router);
    app.use("/projects", projects_router);
    
    app.listen(port, () => { initialize(port); });
}

main();

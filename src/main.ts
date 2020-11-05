import * as express from "express";
import * as cors from "cors";
import { env } from "process";
import { router } from "./routes/api";

const port = env.PORT;
const frontend_url = env.FRONTEND_URL;

if (!port) {
    console.error("No PORT environment variable defined");
    process.exit(1);
}

let app = express();

app.use(cors())

app.use("/api/v1", router);

if (frontend_url) {
    app.use((request, response) => {
        response.redirect(frontend_url);
    });
} else {
    console.warn("No FRONTEND_URL environment variable defined, skipping redirection");
}

app.listen(port, () => { 
    console.log(`Running website API service on port ${port}`);
});

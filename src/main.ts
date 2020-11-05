import * as express from "express";
import * as cors from "cors";
import { router } from "./routes/api";

const port = process.env.PORT;
const frontend_url = process.env.FRONTEND_URL;

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

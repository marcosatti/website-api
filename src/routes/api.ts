import * as express from "express";
import { router as blog_router } from "./blog";
import { router as project_router } from "./project";

export let router = express.Router()

router.use("/blog", blog_router);
router.use("/project", project_router);

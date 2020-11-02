import * as express from "express";
import { controller } from "../controllers/project"

export let router = express.Router()

router.get("/", controller.index);

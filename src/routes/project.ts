import * as express from "express";
import * as asyncHandler from "express-async-handler";
import { controller } from "../controllers/project"

export let router = express.Router()

router.get("/", asyncHandler(controller.index));

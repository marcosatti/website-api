import express from "express";
import { controller } from "../controllers/projects"

export let router = express.Router()

router.get("/", controller.index);

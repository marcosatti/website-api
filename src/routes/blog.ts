import express from "express";
import { controller } from "../controllers/blog"

export let router = express.Router()

router.get("/", controller.index);
router.get("/:id", controller.blog);

import { Request, Response } from "express";

async function index_controller(request: Request, response: Response) {
    response.send("Hello world!");
}

export let controller = {
    index: index_controller,
};

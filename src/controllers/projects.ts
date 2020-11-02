import { Request, Response } from "express";

function index_controller(request: Request, response: Response) {
    response.send("Hello world!");
}

export let controller = {
    index: index_controller,
};

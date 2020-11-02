import { Request, Response } from "express";

function index_controller(request: Request, response: Response) {
    response.send("Hello world!");
}

function blog_controller(request: Request, response: Response) {
    const id = request.params.id;
    response.send(`Hello world! ${id}`);
}

export let controller = {
    index: index_controller,
    blog: blog_controller
};

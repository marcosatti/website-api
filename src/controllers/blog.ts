import { Request, Response } from "express";
import { makeConnection } from "../database/connection";
import { defineBlog } from "../database/models";

async function index_controller(request: Request, response: Response) {
    let session = makeConnection();
    let Blog = defineBlog(session);
    let attributes = ["id", "title", "timestamp"];
    let blogs = await Blog.findAll({ attributes });
    response.send(blogs);
}

async function blog_controller(request: Request, response: Response) {
    let id = request.params.id;
    let session = makeConnection();
    let Blog = defineBlog(session);
    let blog = await Blog.findOne({ where: { id } });

    if (blog) {
        response.send(blog);
    } else {
        response.status(404).send("Blog not found");
    }
}

export let controller = {
    index: index_controller,
    blog: blog_controller
};

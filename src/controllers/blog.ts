import { Request, Response } from "express";
import { makeConnection } from "../database/connection";
import { defineBlog } from "../database/models";
import { Blog } from "../common/types/blog";

async function index_controller(request: Request, response: Response<Blog[]>) {
    let session = makeConnection();
    let BlogModel = defineBlog(session);
    let attributes = ["id", "title", "timestamp"];
    let blogs = await BlogModel.findAll({ attributes });
    let jsonBlogs = blogs.map((blog) => blog.toJSON() as Blog)
    response.json(jsonBlogs);
}

async function blog_controller(request: Request, response: Response<Blog | string>) {
    let id = request.params.id;
    let session = makeConnection();
    let Blog = defineBlog(session);

    let blog = null;
    if (id === "latest") {
        blog = await Blog.findOne({
            order: [["timestamp", "DESC"]],
        });
    } else {
        blog = await Blog.findOne({ 
            where: { id } 
        });
    }

    if (blog) {
        response.send(blog.toJSON() as Blog);
    } else {
        response.status(404).send("Blog not found");
    }
}

export let controller = {
    index: index_controller,
    blog: blog_controller
};

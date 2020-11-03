import { Request, Response } from "express";

async function index_controller(request: Request, response: Response) {
    // TODO: implement.
    response.json([{ 
        title: "psx-rs", 
        description: "Playstation 1 emulator written in Rust", 
        lastUpdated: "2020-08-21T01:00:00Z", 
        imageUrl: null,
        url: "https://github.com/marcosatti/psx-rs" 
    }]);
}

export let controller = {
    index: index_controller,
};

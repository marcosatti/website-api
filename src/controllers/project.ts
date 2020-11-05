import { Request, Response } from "express";
import fetch from "node-fetch";
import { Project } from "../common/types/project";

const GITHUB_API_URL = "https://api.github.com/graphql";
const GITHUB_QUERY = `
    query($username: String!, $cursor: String) {
        user(login: $username) {
            repositories(orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC, first: 10, after: $cursor) {
                pageInfo {
                    hasNextPage
                }
                edges {
                    cursor
                    node {
                        name
                        description
                        pushedAt
                        openGraphImageUrl
                        url
                    }
                }
            }
        }
    }
`;

type GitHubPaginatedResponse = [newCursor: string | null, projects: Project[]];

async function index_controller(request: Request, response: Response<Project[]>) {
    response.json(await query_github());
}

async function query_github(): Promise<Project[]> {
    let projects = [];
    let cursor: string | null = null;

    while (true) {
        let result: GitHubPaginatedResponse = await query_github_paginated(cursor);
        cursor = result[0];
        projects.push(...result[1]);

        if (cursor === null) {
            break;
        }
    }

    return projects;
}

async function query_github_paginated(cursor: string | null): Promise<GitHubPaginatedResponse> {
    const token = process.env.GITHUB_PAT;
    const username = process.env.GITHUB_USERNAME;

    let apiRequest = {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ query: GITHUB_QUERY, variables: { username, cursor } })
    };

    let apiResponse = await fetch(GITHUB_API_URL, apiRequest);
    let jsonBody = await apiResponse.json();
    
    let hasNextPage = jsonBody["data"]["user"]["repositories"]["pageInfo"]["hasNextPage"];
    let edges = jsonBody["data"]["user"]["repositories"]["edges"];

    let nextCursor = null;
    if (hasNextPage) {
        nextCursor = edges[edges.length - 1]["cursor"];
    }

    let projects = edges.map((edge: any) => makeProject(edge["node"]));

    return [nextCursor, projects];
}

function makeProject(edgeNode: any) {
    return {
        title: edgeNode["name"],
        description: edgeNode["description"],
        lastUpdated: edgeNode["pushedAt"],
        imageUrl: edgeNode["openGraphImageUrl"],
        url: edgeNode["url"]
    }
}

export let controller = {
    index: index_controller,
};

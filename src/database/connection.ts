import { Options, Sequelize } from "sequelize";

export function makeConnection(): Sequelize {
    if (!process.env.DB_HOST) {
        throw "Invalid DB host";
    }
    
    if (!process.env.DB_PORT) {
        throw "Invalid DB port";
    }
    
    if (!process.env.DB_PASSWORD) {
        throw "Invalid DB port";
    }

    const options: Options = {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: "postgres",
        password: process.env.DB_PASSWORD,
        database: "postgres",
        dialect: "postgres"
    };

    return new Sequelize(options);
}

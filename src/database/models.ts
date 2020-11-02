import { DataTypes, Sequelize } from "sequelize";

export const defineBlog = function (sequelize: Sequelize) {
    return sequelize.define('Blog', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'blog',
        timestamps: false
    });
}

import pkg from "sequelize";
const { DataTypes, Model } = pkg;
import sequelize from "../index.js";
//const { sequelize } = require("../index");

class User extends Model {}
//module.exports.User = User;
export default User;

User.init(
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: "User",
        timestamps: false,
    }
);

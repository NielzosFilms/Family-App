// const { DataTypes, Model } = require("sequelize");
// const { sequelize } = require("../index");

import pkg from "sequelize";
const { DataTypes, Model } = pkg;
import sequelize from "../index.js";

class Grocery extends Model {}
//module.exports.Grocery = Grocery;
export default Grocery;

Grocery.init(
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
        },
        checked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        updated_by_user: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Grocery",
    }
);

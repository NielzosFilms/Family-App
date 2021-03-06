// const { DataTypes, Model } = require("sequelize");
// const { sequelize } = require("../index");

import pkg from "sequelize";
const { DataTypes, Model } = pkg;
import sequelize from "../index.js";

class CalendarItem extends Model {}
//module.exports.CalendarItem = CalendarItem;
export default CalendarItem;

CalendarItem.init(
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        startDateTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        endDateTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "CalendarItem",
    }
);

//CalendarItem.hasOne(models.User, { foreignKey: "user" });
/*
CalendarItem.associations = function (models) {
    CalendarItem.hasOne(models.User, { foreignKey: "user" });
};
*/

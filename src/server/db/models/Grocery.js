const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../index");

class Grocery extends Model {}
module.exports.Grocery = Grocery;

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
    },
    {
        sequelize,
        modelName: "Grocery",
        timestamps: false,
    }
);

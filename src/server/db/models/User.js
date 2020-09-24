const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../index");

class User extends Model {}
module.exports.User = User;

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

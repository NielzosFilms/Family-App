import pkg from "sequelize";
const {DataTypes, Model} = pkg;
import sequelize from "../index.js";
//const { sequelize } = require("../index");

class Session extends Model {}
//module.exports.User = User;
export default Session;

Session.init(
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		cookie_secret: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		authenticated: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		authenticatedUser: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		sequelize,
		modelName: "Session",
		timestamps: false,
	}
);

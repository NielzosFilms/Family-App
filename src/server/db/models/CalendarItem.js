const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../index");

class CalendarItem extends Model {}
module.exports.CalendarItem = CalendarItem;

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

CalendarItem.associations = function (models) {
	CalendarItem.hasOne(models.User, {foreignKey: "user"});
};

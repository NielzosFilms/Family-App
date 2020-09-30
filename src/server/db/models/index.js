const {User} = require("./User");
const {Grocery} = require("./Grocery");
const {CalendarItem} = require("./CalendarItem");

module.exports = {
	models: {
		User,
		Grocery,
		CalendarItem,
	},
};

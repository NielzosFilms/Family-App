const { User } = require("./User");
const { Grocery } = require("./Grocery");
const { CalendarItem } = require("./CalendarItem");

CalendarItem.hasOne(User, { foreignKey: "user" });

module.exports = {
    models: {
        User,
        Grocery,
        CalendarItem,
    },
};

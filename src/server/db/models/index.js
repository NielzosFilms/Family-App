const { User } = require("./User");
const { Grocery } = require("./Grocery");
const { CalendarItem } = require("./CalendarItem");

CalendarItem.hasOne(User, { foreignKey: "user" });
Grocery.hasOne(User, { foreignKey: "user" });
Grocery.hasOne(User, { foreignKey: "updated_by_user" });

module.exports = {
    models: {
        User,
        Grocery,
        CalendarItem,
    },
};

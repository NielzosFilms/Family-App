// const { User } = require("./User");
// const { Grocery } = require("./Grocery");
// const { CalendarItem } = require("./CalendarItem");

import User from "./User.js";
import Grocery from "./Grocery.js";
import CalendarItem from "./CalendarItem.js";

import Session from "./Session.js";

CalendarItem.hasOne(User, { foreignKey: "user" });
Grocery.hasOne(User, { foreignKey: "user" });
Grocery.hasOne(User, { foreignKey: "updated_by_user" });

Session.hasOne(User, { foreignKey: "authenticatedUser" });

// module.exports  {
//     models: {
//         User,
//         Grocery,
//         CalendarItem,
//     },
// };

export default {
    User,
    Grocery,
    CalendarItem,
    Session,
};

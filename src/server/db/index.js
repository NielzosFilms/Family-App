const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize("family_app", "niels", "", {
    host: "localhost",
    dialect: "mysql",
});
module.exports.sequelize = sequelize;

const { User } = require("./models/User");

async function connect() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
connect();

// User testing
/*
console.log(User === sequelize.models.User);
const user = User.build({ username: "Test", password: "test_pass" });
async function saveUser(user) {
    await user.save();
}
//saveUser(user);

async function syncDatabase() {
    await sequelize.sync({ force: true });
    console.log("Synced");
}
//syncDatabase();
*/

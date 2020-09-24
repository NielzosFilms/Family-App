const {Sequelize, DataTypes, Model} = require("sequelize");

const sequelize = new Sequelize("family_app", "root", "", {
	host: "localhost",
	dialect: "mysql",
});
module.exports.sequelize = sequelize;

async function connect() {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}
connect();

// migrate database
/*
async function syncDatabase() {
	await sequelize.sync({force: false, alter: true});
	console.log("Synced");
}
syncDatabase();
*/

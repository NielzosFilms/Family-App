const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		dialect: "mysql",
	}
);
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

async function syncDatabase() {
	await sequelize.sync({force: false, alter: true});
	console.log("Synced");
	process.exit();
}

if (process.argv[2] == "migrate") {
	syncDatabase();
}

//const Sequelize = require("sequelize");
import Sequelize from "sequelize";
import PasswordHash from "password-hash";
import Crypto from "crypto";

const isAuthenticated = async (models, req) => {
	if (!req.cookies["cookie_secret"]) return false;
	let session = await models.Session.findOne({
		where: {cookie_secret: req.cookies["cookie_secret"]},
	});
	if (session) {
		return Boolean(session.authenticated);
	}
	return false;
};

export const resolvers = {
	Query: {
		async login(_, {username, password}, {models, req, res}) {
			let user = await models.User.findOne({where: {username}});
			if (user) {
				const secret = Crypto.randomBytes(16).toString("base64");
				if (PasswordHash.verify(password, user.password)) {
					res.cookie("cookie_secret", secret);
					models.Session.create({
						cookie_secret: secret,
						authenticated: true,
						authenticatedUser: user.id,
					});
					return true;
				}
			}
			return false;
		},
		async logout(_, {}, {models, req, res}) {
			if (!(await isAuthenticated(models, req))) return null;
			res.cookie("cookie_secret", req.cookies["cookie_secret"], {
				maxAge: 0,
			});
			return models.Session.destroy({
				where: {cookie_secret: req.cookies["cookie_secret"]},
			});
		},
		async authenticated(_, {}, {models, req, res}) {
			if (!req.cookies["cookie_secret"]) return false;
			let session = await models.Session.findOne({
				where: {cookie_secret: req.cookies["cookie_secret"]},
			});
			if (session) {
				return Boolean(session.authenticated);
			}
			return false;
		},
		async authenticatedUser(_, {}, {models, req, res}) {
			if (!(await isAuthenticated(models, req))) return null;
			let session = await models.Session.findOne({
				where: {cookie_secret: req.cookies["cookie_secret"]},
			});
			if (session) {
				return models.User.findByPk(session.authenticatedUser);
			}
		},
		async users(_, {input}, {models, req, res}) {
			if (!(await isAuthenticated(models, req))) return null;
			return models.User.findAll();
		},
		async user(_, {id}, {models, req, res}) {
			if (!(await isAuthenticated(models, req))) return null;
			return models.User.findByPk(id);
		},
		async userByUsername(_, {username}, {models, req, res}) {
			if (!(await isAuthenticated(models, req))) return null;
			return models.User.findOne({where: {username}});
		},

		async groceries(_, {name}, {models, req, res}) {
			if (!(await isAuthenticated(models, req))) return null;
			return models.Grocery.findAll({
				where: {
					...(name
						? {
								name: {
									[Sequelize.Op.like]: `%${name}%`,
								},
						  }
						: null),
				},
				order: [
					["checked", "ASC"],
					["name", "ASC"],
				],
			});
		},
		async grocery(_, {id}, {models, req, res}) {
			if (!(await isAuthenticated(models, req))) return null;
			return models.Grocery.findByPk(id);
		},

		async calendarItems(_, {input}, {models, req, res}) {
			if (!(await isAuthenticated(models, req))) return null;
			return models.CalendarItem.findAll();
		},
		async calendarItem(_, {id}, {models, req, res}) {
			if (!(await isAuthenticated(models, req))) return null;
			return models.CalendarItem.findByPk(id);
		},
	},
	Mutation: {
		async createUser(
			root,
			{id, username, password, color},
			{models, req, res}
		) {
			if (!(await isAuthenticated(models, req))) return null;
			return models.User.create({
				username,
				password,
				color,
			});
		},
		async updateUser(
			root,
			{id, username, password, color},
			{models, req, res}
		) {
			if (!(await isAuthenticated(models, req))) return null;
			await models.User.update(
				{username, password, color},
				{where: {id}}
			);
			return models.User.findByPk(id);
		},

		async updateGrocery(
			root,
			{id, name, amount, checked, user, updated_by_user},
			{models, req, res}
		) {
			if (!(await isAuthenticated(models, req))) return null;
			await models.Grocery.update(
				{name, amount, checked, user, updated_by_user},
				{where: {id}}
			);
			return models.Grocery.findByPk(id);
		},
		async createGrocery(
			root,
			{name, amount, checked, user},
			{models, req, res}
		) {
			if (!(await isAuthenticated(models, req))) return null;
			return models.Grocery.create({
				name,
				amount,
				checked: checked || false,
				user,
			});
		},
		async deleteCheckedGroceries(root, {}, {models, req, res}) {
			if (!(await isAuthenticated(models, req))) return null;
			return models.Grocery.destroy({
				where: {
					checked: true,
				},
			});
		},

		async deleteGrocery(root, {id}, {models, req, res}) {
			if (!(await isAuthenticated(models, req))) return null;
			return models.Grocery.destroy({
				where: {
					id,
				},
			});
		},

		async createCalendarItem(
			root,
			{title, description, startDateTime, endDateTime, user},
			{models, req, res}
		) {
			if (!(await isAuthenticated(models, req))) return null;
			return models.CalendarItem.create({
				title,
				description,
				startDateTime,
				endDateTime,
				user,
			});
		},
	},
	CalendarItem: {
		async user(user, args, ctx, info) {
			//if (!(await isAuthenticated(models, headers))) return null;
			return resolvers.Query.user(null, {id: user.user}, ctx);
		},
	},
	Grocery: {
		async user(user, args, ctx, info) {
			//if (!(await isAuthenticated(models, headers))) return null;
			return resolvers.Query.user(null, {id: user.user}, ctx);
		},
		async updated_by_user(updated_by_user, args, ctx, info) {
			//if (!(await isAuthenticated(models, headers))) return null;
			return resolvers.Query.user(
				null,
				{id: updated_by_user.updated_by_user},
				ctx
			);
		},
	},
};

//module.exports = resolvers;

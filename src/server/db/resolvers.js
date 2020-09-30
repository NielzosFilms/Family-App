const resolvers = {
	Query: {
		users(_, {input}, {models}) {
			return models.User.findAll();
		},
		user(_, {id}, {models}) {
			return models.User.findByPk(id);
		},
		userByUsername(_, {username}, {models}) {
			return models.User.findOne({where: {username}});
		},

		groceries(_, {input}, {models}) {
			return models.Grocery.findAll();
		},
		grocery(_, {id}, {models}) {
			return models.Grocery.findByPk(id);
		},

		calendarItems(_, {input}, {models}) {
			return models.CalendarItem.findAll();
		},
		calendarItem(_, {id}, {models}) {
			return models.CalendarItem.findByPk(id);
		},
	},
	Mutation: {
		async createUser(root, {id, username, password, color}, {models}) {
			return models.User.create({
				username,
				password,
				color,
			});
		},

		async updateGrocery(root, {id, name, amount, checked}, {models}) {
			models.Grocery.update({checked}, {where: {id}});
			return models.Grocery.findByPk(id);
		},
		async createGrocery(root, {name, amount, checked}, {models}) {
			return models.Grocery.create({
				name,
				amount,
				checked: checked || false,
			});
		},
		async deleteGrocery(root, {id}, {models}) {
			return models.Grocery.destroy({
				where: {
					id,
				},
			});
		},

		async createCalendarItem(
			root,
			{title, description, startDateTime, endDateTime, user},
			{models}
		) {
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
		async user(user) {
			//user.user == user.id
			//console.log(val.user);
			return user.user();
		},
	},
};

module.exports = resolvers;

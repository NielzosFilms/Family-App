const Sequelize = require("sequelize");

const resolvers = {
    Query: {
        users(_, { input }, { models }) {
            return models.User.findAll();
        },
        user(_, { id }, { models }) {
            return models.User.findByPk(id);
        },
        userByUsername(_, { username }, { models }) {
            return models.User.findOne({ where: { username } });
        },

        groceries(_, { name }, { models }) {
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
        grocery(_, { id }, { models }) {
            return models.Grocery.findByPk(id);
        },

        calendarItems(_, { input }, { models }) {
            return models.CalendarItem.findAll();
        },
        calendarItem(_, { id }, { models }) {
            return models.CalendarItem.findByPk(id);
        },
    },
    Mutation: {
        async createUser(root, { id, username, password, color }, { models }) {
            return models.User.create({
                username,
                password,
                color,
            });
        },
        async updateUser(root, { id, username, password, color }, { models }) {
            await models.User.update(
                { username, password, color },
                { where: { id } }
            );
            return models.User.findByPk(id);
        },

        async updateGrocery(
            root,
            { id, name, amount, checked, user, updated_by_user },
            { models }
        ) {
            await models.Grocery.update(
                { name, amount, checked, user, updated_by_user },
                { where: { id } }
            );
            return models.Grocery.findByPk(id);
        },
        async createGrocery(root, { name, amount, checked, user }, { models }) {
            return models.Grocery.create({
                name,
                amount,
                checked: checked || false,
                user,
            });
        },
        async deleteCheckedGroceries(root, {}, { models }) {
            return models.Grocery.destroy({
                where: {
                    checked: true,
                },
            });
        },

        async deleteGrocery(root, { id }, { models }) {
            return models.Grocery.destroy({
                where: {
                    id,
                },
            });
        },

        async createCalendarItem(
            root,
            { title, description, startDateTime, endDateTime, user },
            { models }
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
        async user(user, args, ctx, info) {
            return resolvers.Query.user(null, { id: user.user }, ctx);
        },
    },
    Grocery: {
        async user(user, args, ctx, info) {
            return resolvers.Query.user(null, { id: user.user }, ctx);
        },
        async updated_by_user(updated_by_user, args, ctx, info) {
            return resolvers.Query.user(
                null,
                { id: updated_by_user.updated_by_user },
                ctx
            );
        },
    },
};

module.exports = resolvers;

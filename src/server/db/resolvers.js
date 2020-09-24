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
        groceries(_, { input }, { models }) {
            return models.Grocery.findAll();
        },
        grocery(_, { id }, { models }) {
            return models.Grocery.findByPk(id);
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
        async updateGrocery(root, { id, name, amount, checked }, { models }) {
            models.Grocery.update({ checked }, { where: { id } });
            return models.Grocery.findByPk(id);
        },
        async createGrocery(root, { name, amount, checked }, { models }) {
            return models.Grocery.create({
                name,
                amount,
                checked: checked || false,
            });
        },
        async deleteGrocery(root, { id }, { models }) {
            return models.Grocery.destroy({
                where: {
                    id,
                },
            });
        },
    },
};

module.exports = resolvers;

const resolvers = {
    Query: {
        users(_, { input }, { models }) {
            return models.User.findAll();
        },
    },
    Mutation: {
        async createUser(root, { username, password, color }, { models }) {
            return models.User.create({
                username,
                password,
                color,
            });
        },
    },
};

module.exports = resolvers;

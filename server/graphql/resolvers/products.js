const ApoloServer = require("apollo-server-express");
const {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} = ApoloServer;

module.exports = {
  getProducts: async (args, context) => {
    const { _id } = context.userAuth;
    if (!_id) {
      return new ApolloError("User not exit", 400);
    }
    console.log(args, "argsargsargs");
  },
};

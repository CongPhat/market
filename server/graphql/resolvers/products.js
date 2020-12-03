const ApoloServer = require("apollo-server-express");
const Products = require("../../models/Products");
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
    console.log(args, "argsargs");
    const result = await Products.find({ categoryId: args.idCategory })
      .sort({ date: "desc" })
      .skip(args.pageNumber * args.pageSize)
      .limit(args.pageSize);
    console.log(result);
    return result;
  },
};

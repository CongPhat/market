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
    const result = await Products.find({ categoryId: args.idCategory })
      .sort({ date: "desc" })
      .skip(args.pageNumber * args.pageSize)
      .limit(args.pageSize);
    return result;
  },
  getDetailProduct: async (args, context) => {
    const { _id } = context.userAuth;
    if (!_id) {
      return new ApolloError("User not exit", 400);
    }
    const result = await Products.findOne({ _id: args.idProduct });
    if (!result) return new ApolloError("Product does not exist", 400);
    return result;
  },
};

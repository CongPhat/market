const ApoloServer = require("apollo-server-express");
const {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} = ApoloServer;

class NewError {
  constructor(message) {}
}

const message = {
  messageSuccess: (message, data) => {
    return {
      message,
      data,
      status: 200,
    };
  },
  messageError: (message, data) => {
    return {
      message,
      data,
      status: 400,
    };
  },
};

module.exports = message;

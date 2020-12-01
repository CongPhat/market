// const controllerUsers = require("./../../controller/Users");
const { PubSub } = require("graphql-subscriptions");
const { withFilter } = require("apollo-server");
const pubsub = new PubSub();
module.exports = {
  getProfile: async (args, context) => {
    console.log(context);
    const { id } = args;
    console.log(id, "idid");
    // return await controllerUsers.getProfile(id);
  },
};

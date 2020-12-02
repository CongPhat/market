const controllerUsers = require("./../../controller/users");

module.exports = {
  getProfile: async (args, context) => {
    const { _id } = context.userAuth;
    return await controllerUsers.getProfileController(_id);
  },
};

// const Message = require("./../models/Message");
const Users = require("./../models/Users");

const controllerUsers = {
  getProfileController: async (id) => {
    const result = await Users.findOne(
      { _id: id },
      "_id name image description"
    );
    return result;
  },
};
module.exports = controllerUsers;

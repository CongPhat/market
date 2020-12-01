const resolverMessage = require("./message");
const resolverFriend = require("./friend");
const resolverUsers = require("./users");
module.exports = {
  ...resolverMessage,
  ...resolverFriend,
  ...resolverUsers,
};

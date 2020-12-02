const resolverMessage = require("./message");
const resolverFriend = require("./friend");
const resolverUsers = require("./users");
const resolverCategory = require("./category");
const resolverProducts = require("./products");
module.exports = {
  ...resolverMessage,
  ...resolverFriend,
  ...resolverUsers,
  ...resolverCategory,
  ...resolverProducts,
};

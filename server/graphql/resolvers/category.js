const controllerCategory = require("./../../controller/category");
module.exports = {
  getCategory: async (args, context) => {
    const { _id } = context.userAuth;
    return await controllerCategory.getCategoryController();
  },
};

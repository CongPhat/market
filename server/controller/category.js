const Category = require("./../models/Category");
const User = require("./../models/Users");

const controllerCategory = {
  getCategoryController: async () => {
    const result = await Category.find();
    return result;
  },
};
module.exports = controllerCategory;

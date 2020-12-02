const Category = require("./../models/Category");
const User = require("./../models/Users");

const controllerCategory = {
  getCategoryController: async () => {
    const result = await Category.find();
    console.log(result, "result");
    return result;
  },
};
module.exports = controllerCategory;

module.exports = {
  typeQuery: `  
        type Category {
            _id: String!
            name: String!
            icon: String!
            idParent: String!
        }
      `,
  query: `
          getCategory: [Category]!
        `,
  mutation: `
        `,
  subscription: `
  
        `,
};

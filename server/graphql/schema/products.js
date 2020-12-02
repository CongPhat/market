module.exports = {
  typeQuery: `  
        type Products {
            _id: String!
            content: String!
            price: String!
            address: String!
            userId: String!
            categoryId: String!
            media: [Media]!
            trending: Boolean!
        }
      `,
  query: `
            getProducts(pageSize: Int!, pageNumber: Int!, idCategory: String!): [Products]!
        `,
  mutation: `
        `,
  subscription: `
  
        `,
};

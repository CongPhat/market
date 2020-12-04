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
            title: String!
        }
      `,
  query: `
            getProducts(pageSize: Int!, pageNumber: Int!, idCategory: String!): [Products]!
            getDetailProduct(idProduct: String!) : Products!
        `,
  mutation: `
        `,
  subscription: `
  
        `,
};

module.exports = {
  typeQuery: `  
        type User {
            _id: String!
            name: String!
            image: String!
            description: String!
            online: Boolean!
        }
      `,
  query: `
          getProfile: User!
        `,
  mutation: `
        `,
  subscription: `
  
        `,
};

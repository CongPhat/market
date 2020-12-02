const { buildSchema } = require("graphql");
const schemaMessage = require("./message");
const schemaFriend = require("./friend");
const schemaUsers = require("./users");
const schemaCategory = require("./category");
const schemaProducts = require("./products");
const schemaMedia = require("./media");
module.exports = buildSchema(`
    ${schemaMessage.typeQuery}
    ${schemaFriend.typeQuery}
    ${schemaUsers.typeQuery}
    ${schemaCategory.typeQuery}
    ${schemaProducts.typeQuery}
    ${schemaMedia.typeQuery}
    type RootQuery {
        ${schemaMessage.query}
        ${schemaFriend.query}
        ${schemaUsers.query}
        ${schemaCategory.query}
        ${schemaProducts.query}
    }
    type RootMutation {
        ${schemaMessage.mutation}
        ${schemaFriend.mutation}
    }
    type RootSubscription {
        ${schemaMessage.subscription}
        ${schemaFriend.subscription}
    }
    schema {
        query: RootQuery
        mutation: RootMutation
        subscription: RootSubscription
    }
`);

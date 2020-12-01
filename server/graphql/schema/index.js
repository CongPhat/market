const { buildSchema } = require("graphql");
const schemaMessage = require("./message");
const schemaFriend = require("./friend");
const schemaUsers = require("./users");
module.exports = buildSchema(`
    ${schemaMessage.typeQuery}
    ${schemaFriend.typeQuery}
    ${schemaUsers.typeQuery}
    type RootQuery {
        ${schemaMessage.query}
        ${schemaFriend.query}
        ${schemaUsers.query}
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

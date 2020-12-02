const express = require("express");
const Joi = require("joi");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const controllerAuth = require("./controller/auth");
// const { GraphQLServer, PubSub } = require("graphql-yoga");
const { ApolloServer, gql } = require("apollo-server-express");
const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const { SubscriptionServer } = require("subscriptions-transport-ws");

const mongoUrl = "mongodb://localhost:27017/market?retryWrites=true&w=majority";
// server socket
// const server = require("http").createServer(app);
// const io = require("socket.io").listen(server);
// users = {};
// server.listen(3001);

require("dotenv/config");
app.use(
  cors({
    origin: ["http://localhost:6969", "https://congphat.github.io"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.set("socketio", io);

const PostRouter = require("./routes/posts");
const UserRouter = require("./routes/users");
const CommentRouter = require("./routes/comments");
const MessageRouter = require("./routes/message");

//Graphql
const schemaGraphql = require("./graphql/schema");
const resolversGraphql = require("./graphql/resolvers");

app.get("/", (req, res) => {
  res.send("Let's goooooo thooii");
});
app.use("/post", PostRouter);
app.use("/user", UserRouter);
app.use("/comment", CommentRouter);
app.use("/message", MessageRouter);
app.use("/img", express.static("public/images"));
app.use("/graphql", bodyParser.json());

const apolloServer = new ApolloServer({
  schema: schemaGraphql,
  rootValue: resolversGraphql,
  context: async ({ req, connection }) => {
    if (connection) {
      return connection.context;
    } else {
      if (!req.headers.authorization) {
        throw new Error("Missing auth token!");
      }
      const userResult = await controllerAuth.checkTokenGraphql(
        req.headers.authorization
      );
      return { userAuth: userResult };
    }
  },
  playground: true,
  introspection: true,
});
apolloServer.applyMiddleware({ app });
let idUserCurrent = "";
const pubsub = new PubSub();
const server = createServer(app);
// apolloServer.installSubscriptionHandlers(server);
server.listen(3000, () => {
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema: schemaGraphql,
      rootValue: resolversGraphql,
      graphiql: true,
      onConnect: async (connectionParams, webSocket, context) => {
        const result = await controllerAuth.checkTokenGraphql(
          connectionParams.authToken
        );
        controllerAuth.userOnline(result._id);
        return { userOnline: result };
      },
      onDisconnect: async (webSocket, context) => {
        context.initPromise.then((res) => {
          console.log(res, "disconnect");
          controllerAuth.userOffline(res.userOnline._id);
        });
      },
    },
    {
      server: server,
      path: `/subscriptions`,
    }
  );
});

const connectWithRetry = function () {
  // when using with docker, at the time we up containers. Mongodb take few seconds to starting, during that time NodeJS server will try to connect MongoDB until success.
  return mongoose.connect(
    mongoUrl,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.error(
          "Failed to connect to mongo on startup - retrying in 5 sec",
          err
        );
        setTimeout(connectWithRetry, 5000);
      } else {
        console.log("Connect");
      }
    }
  );
};
connectWithRetry();

import { ApolloServer } from "apollo-server";
import "dotenv/config";
import mongoose from "mongoose";

import { ProductResolvers } from "./resolvers/product.resolvers.js";
import { UserResolvers } from "./resolvers/user.resolver.js";
import { typeDefs } from "./typeDefs.js";
import { getUser } from "./utils/auth.utils.js";

const uri = process.env.MONGODB_URI;
const main = async () => {
  await mongoose.connect(uri);
};

main()
  .then(console.log("🎉 connected to database successfully"))
  .catch((error) => console.error(error));

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    ...UserResolvers,
    ...ProductResolvers,
    Query: {
      ...UserResolvers.Query,
      ...ProductResolvers.Query,
    },
    Mutation: {
      ...UserResolvers.Mutation,
      ...ProductResolvers.Mutation,
    },
  },
  context: ({ req }) => {
    return req && req.headers.authorization ? getUser(req) : null;
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

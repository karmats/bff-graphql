import cors from "cors";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello(id: String): [Hello]
    bye: String
  }
  type Hello {
      id: String
      name: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: ({ id }) => {
    console.log(id);
    return [{ id: "123", name: "Mats" }];
  },
  bye: () => "Good bye cruel world :(",
};

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");

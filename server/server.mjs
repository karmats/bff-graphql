import cors from "cors";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import fetch from "node-fetch";

const baseUrl = "https://dev-api.wolterskluwercloud.se/dev1/Dashboard/api";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello(id: String): Hello
    bye: String
    clients: [Client]
  }
  type Hello {
      id: String
      name: String
  }
  type Client {
    Id: String
    ClientNumber: String
    ClientOwner: String
    CompanyName: String
    CompanyType: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => ({ id: "123", name: "Mats" }),
  bye: () => "Good bye cruel world :(",
  clients: async (_, request) => {
    const bearer = request.headers.authorization;
    const response = await fetch(`${baseUrl}/FilteredData`, {
      method: "put",
      body: { myClients: { id: 1 } },
      headers: {
        accept: "application/json",
        authorization: bearer,
        ["content-type"]: "application/json",
      },
    });
    return await response.json();
  },
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

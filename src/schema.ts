import gql from "graphql-tag";

export const typeDefs = gql`
  type Counter {
    id: String!
    name: String!
    count: Int!
  }

  type Query {
    counter(id: ID!, name: String!): Counter!
  }

  type Mutation {
    incrementCount(id: ID!, name: String!): Int!
    decrementCount(id: ID!, name: String!): Int!
    createCounter(name: String!): Counter!
  }
`;

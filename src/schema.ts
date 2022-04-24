import gql from "graphql-tag";

export const typeDefs = gql`
  type Counter {
    id: String!
    name: String!
    count: Int!
  }
  
  type Query {
    counter(id: ID!): Counter!
  }
  
  type Mutation {
    incrementCount(id: ID!): Int!
    decrementCount(id: ID!): Int!
    createCounter(name: String!): Counter!
  }
`;

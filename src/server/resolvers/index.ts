import { Resolvers } from "@/server/models.gen";
import { Mutation } from "@/server/resolvers/MutationResolver";
import { Query } from "@/server/resolvers/QueryResolver";

export const resolvers: Resolvers = {
  Query,
  Mutation
};

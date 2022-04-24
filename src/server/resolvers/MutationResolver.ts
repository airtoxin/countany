import { MutationResolvers } from "@/server/models.gen";

export const Mutation: MutationResolvers = {
  createCounter: async (parent, args, context) => {
    return {
      id: Math.random().toString(16),
      name: args.name,
      count: 0
    };
  }
};

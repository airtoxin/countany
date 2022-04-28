import { MutationResolvers } from "@/server/models.gen";
import { CounterSchema } from "@/server/types";
import { GraphQLYogaError } from "@graphql-yoga/common";

export const Mutation: MutationResolvers = {
  createCounter: async (parent, { name }, { jsonio, hashids }) => {
    const counterRow = await jsonio.createRow(name, {
      count: 0,
    });
    const count = CounterSchema.parse(counterRow.json);
    return {
      id: hashids.encode(counterRow.id),
      name: counterRow.bucket.name,
      count: count.count,
    };
  },

  incrementCount: async (parent, { id, name }, { jsonio, hashids }) => {
    const decoded = hashids.decode(id);
    if (decoded.length !== 1)
      throw new GraphQLYogaError(`Invalid rowId: ${id}`);
    const rowId = Number(decoded[0]);

    const row = await jsonio.getRow(name, rowId);
    const result = await jsonio.updateRow(name, rowId, {
      count: row.json.count + 1,
    });
    return result.json.count;
  },

  decrementCount: async (parent, { id, name }, { jsonio, hashids }) => {
    const decoded = hashids.decode(id);
    if (decoded.length !== 1)
      throw new GraphQLYogaError(`Invalid rowId: ${id}`);
    const rowId = Number(decoded[0]);

    const row = await jsonio.getRow(name, rowId);
    const result = await jsonio.updateRow(name, rowId, {
      count: row.json.count - 1,
    });
    return result.json.count;
  },
};

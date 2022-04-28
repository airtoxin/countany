import { QueryResolvers } from "@/server/models.gen";
import { z } from "zod";
import { CounterSchema } from "@/server/types";

export const Query: QueryResolvers = {
  counter: async (parent, { id, name }, { jsonio, hashids }) => {
    const row = await jsonio.getRow(
      name,
      z.number().int().parse(hashids.decode(id)[0])
    );
    return {
      id,
      name,
      count: CounterSchema.parse(row.json).count,
    };
  },
};

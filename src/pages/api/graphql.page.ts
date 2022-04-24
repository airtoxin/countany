import { typeDefs } from "@/schema";
import { resolvers } from "@/server/resolvers";
import { createServer } from "@graphql-yoga/node";
import { NextApiRequest, NextApiResponse } from "next";
import { Context } from "@/server/resolvers/Context";

const server = createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema: { typeDefs, resolvers },
  context: async (initialContext): Promise<Context> => {
    return {
      ...initialContext,
    };
  },
});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default server;

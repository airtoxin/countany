import { typeDefs } from "@/schema";
import { resolvers } from "@/server/resolvers";
import { createServer } from "@graphql-yoga/node";
import { NextApiRequest, NextApiResponse } from "next";
import { createContext } from "@/server/resolvers/Context";

const server = createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema: { typeDefs, resolvers },
  context: createContext,
});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default server;

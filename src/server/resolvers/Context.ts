import { YogaInitialContext } from "@graphql-yoga/common/types";
import { JsonioClient } from "@/libs/jsonio-client";
import Hashids from "hashids";
import { APPLICATION_SECRET, JSONIO_AUTH_TOKEN } from "@/server/constants";

export type Context = Readonly<YogaInitialContext> & {
  readonly jsonio: JsonioClient;
  readonly hashids: Hashids;
};

export const createContext = (yogaContext: YogaInitialContext): Context => ({
  ...yogaContext,
  jsonio: new JsonioClient(JSONIO_AUTH_TOKEN),
  hashids: new Hashids(APPLICATION_SECRET),
});

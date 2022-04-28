import { z } from "zod";

export const APPLICATION_SECRET = z
  .string()
  .nonempty()
  .parse(process.env.APPLICATION_SECRET);
export const JSONIO_AUTH_TOKEN = z
  .string()
  .nonempty()
  .parse(process.env.JSONIO_AUTH_TOKEN);

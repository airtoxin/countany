import { z } from "zod";

export const CounterSchema = z.object({
  count: z.number().int(),
});

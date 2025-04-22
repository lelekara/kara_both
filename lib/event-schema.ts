 import { z } from "zod";
 
export const formSchema = z.object({
    title: z.string().min(1).min(1),
    Description: z.string().min(1).min(1),
    secret: z.number().min(0).max(9999).optional()
  });
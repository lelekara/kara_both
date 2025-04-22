 import { z } from "zod";
 
export const formSchema = z.object({
    title: z.string().min(1).min(1),
    Description: z.string().min(1).min(1),
    secret: z.string().min(0).optional()
  });

  export const formSchemaJoin = formSchema.pick({
    title:true,
    secret:true,
  });
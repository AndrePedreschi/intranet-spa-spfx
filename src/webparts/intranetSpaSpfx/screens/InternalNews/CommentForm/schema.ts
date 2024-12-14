import { z } from "zod";

export const commentFormSchema = z.object({
  msg: z.string().min(3, { message: "Digite um texto maior :)" }),
});

export type TCommentsFormFields = z.infer<typeof commentFormSchema>;

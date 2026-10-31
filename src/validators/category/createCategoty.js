import z from "zod";

export const createCategorySchema = z.object({
  title: z.string().min(3, { error: "name too short" }),
});
export const updateCategorySchema = createCategorySchema.optional();

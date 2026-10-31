import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, { error: "too short name" }),
  price: z
    .number({ error: "Price must be a number" })
    .min(1, { error: "Price must be at least 1" }),

  stock: z.number({ error: "Stock must be a number" }).min(0).default(0),
  categoryId: z
    .number({ error: "Category ID must be a number" })
    .int()
    .positive({ error: "Category ID must be positive" }),
});

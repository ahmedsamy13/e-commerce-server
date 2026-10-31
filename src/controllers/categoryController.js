import { db } from "../prisma/db.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validators/category/createCategoty.js";

export const getAllCategories = async (req, res, next) => {
  try {
    const result = await db.orm.public.Category.all();
    if (result.length === 0) {
      return res.status(400).json({
        status: "success",
        message: "no category added yet",
      });
    }
    res.status(200).json({
      status: "success",
      message: "categories fetched",
      data: {
        result,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: `failed to load category,&${err}`,
    });
  }
};
export const getCategory = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const category = await db.orm.public.Category.first({ id });
    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: `category with id ${id} does not exist`,
      });
    }
    res.status(200).json({
      status: "success",
      message: "category fetched",
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: `failed to load category: ${err}`,
    });
  }
};
export const updateCategory = async (req, res, next) => {
  const result = updateCategorySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      status: "fail",
      message: result.error.issues[0].message,
    });
  }

  try {
    const id = parseInt(req.params.id, 10);
    const category = await db.orm.public.Category.whereUnique({ id }).update(
      result.data,
    );

    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: `Category with ID ${id} not found`,
      });
    }

    res.status(200).json({
      status: "success",
      message: `${category.title} updated successfully`,
      data: { category },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: `${err}`,
    });
  }
};
export const createCategory = async (req, res, next) => {
  const result = createCategorySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      status: "fail",
      message: result.error.issues[0].message,
    });
  }

  try {
    const data = result.data;
    const category = await db.orm.public.Category.create(data);

    res.status(201).json({
      status: "success",
      message: `${category.title} added successfully`,
      data: { category },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: `${err}`,
    });
  }
};

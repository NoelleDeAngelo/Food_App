import type { Prisma, Item, Tag, Category } from "~/generated/prisma/client";

export type TagSummary = Pick<Tag, "id" | "name">;

export type CategorySummary = Pick<Category, "id" | "name">;

export type ItemWithTagsAndCategories = Pick<Item, "id" | "name"> & {
  tags: TagSummary[];
  categories: CategorySummary[];
};
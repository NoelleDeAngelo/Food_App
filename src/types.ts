import type { Prisma, Tag, Category} from "~/generated/prisma/client";

export type ItemWithTagsAndCategories = Prisma.ItemGetPayload<{
  include: {
    tags: true;
    categories: true;
  };
}>;

export type TagSummary = Pick<Tag, "id" | "name">;

export type CategorySummary = Pick<Category, "id" | "name">;

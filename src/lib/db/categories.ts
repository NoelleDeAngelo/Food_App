import prisma from "@/lib/db/prisma";

export async function getUserCategories(userId: string) {
  const categories = await prisma.category.findMany({
    where: {
      userId: userId,
    },
  });
  return categories;
}

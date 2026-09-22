import prisma from "@/lib/db/prisma";


export async function getUserCategories(userId: number) {
  const categories = await prisma.category.findMany({
    where: {
      userId: userId,
    },
  });
  return categories;
}
import prisma from "@/lib/db/prisma";


export async function getAllUserItems(userId: number) {
  const items = await prisma.item.findMany({
    where: {
      userId: userId,
    },
    include: {
      tags: true,
      categories: true,
    },
  });
  return items;
}

export async function getAvailableUserItems(userId: number) {
  const items = await prisma.item.findMany({
    where: {
      userId: userId,
      isAvailable: true,
    },
    include: {
      tags: true,
      categories: true,
    },
  });
  return items;
}

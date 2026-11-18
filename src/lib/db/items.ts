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
export async function getUsersItemById(itemId: number, userId: number) {
  return prisma.item.findUnique({
    where: {
      id: itemId,
      userId,
    },
    include: {
      tags: true,
      categories: true,
    },
  });
}

export async function updateItem(
  userId: number,
  itemId: number,
  name: string,
  isAvailable: boolean,
  isOnGroceryList: boolean,
  categoryIds: number[],
  tagIds: number[],
) {
  const updatedItem = await prisma.item.update({
    where: { id: itemId, userId },
    data: {
      name,
      isAvailable,
      isOnGroceryList,
      categories: {
        set: categoryIds.map((id) => ({ id })),
      },
      tags: {
        set: tagIds.map((id) => ({ id })),
      },
    },
    include: {
      tags: true,
      categories: true,
    },
  });

  return updatedItem;
}

import prisma from "@/lib/db/prisma";

export async function getAllUserItems(userId: string) {
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

export async function getAvailableUserItems(userId: string) {
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

export async function getGroceryListUserItems(userId: string) {
  const items = await prisma.item.findMany({
    where: {
      userId: userId,
      isOnGroceryList: true,
    },
    include: {
      tags: true,
      categories: true,
    },
  });
  return items;
}

export async function getUsersItemById(itemId: number, userId: string) {
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
  userId: string,
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

export async function createItem(
  userId: string,
  name: string,
  isAvailable: boolean,
  isOnGroceryList: boolean,
  categoryIds: number[],
  tagIds: number[],
) {
  const newItem = await prisma.item.create({
    data: {
      name,
      isAvailable,
      isOnGroceryList,
      userId,
      categories: {
        connect: categoryIds.map((id) => ({ id })),
      },
      tags: {
        connect: tagIds.map((id) => ({ id })),
      },
    },
    include: {
      tags: true,
      categories: true,
    },
  });

  return newItem;
}

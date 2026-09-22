import prisma from "@/lib/db/prisma";


export async function getAllUserItems(userId: number) {
  const items = await prisma.item.findMany({
    where: {
      userId: userId
    },
  });
  return items;
}

export async function getAvailableUserItems(userId: number) {
  const items = await prisma.item.findMany({
    where: {
      userId: userId,
      isAvailable: true
    },
  });
  return items;
}

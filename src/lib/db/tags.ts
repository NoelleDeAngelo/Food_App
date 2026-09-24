import prisma from "@/lib/db/prisma";

export async function getUserTags(userId: number) {
  const tags = await prisma.tag.findMany({where: {
      userId: userId,
    },});
  return tags;
}

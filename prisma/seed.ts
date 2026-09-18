import { prisma } from "@/lib/prisma";

async function main() {
  // create user
  const user = await prisma.user.create({
    data: {
      name: "Jane",
    },
  });

  // create tags
  const easyTag = await prisma.tag.create({
    data:
    {
      name: "easy",
      userId: user.id,
    }
  });
  const requiresCookingTag = await prisma.tag.create({
    data:
    {
      name: "Requires Cooking",
      userId: user.id,
    }
  });
  const coldTag = await prisma.tag.create({
    data: {
      name: "cold",
      userId: user.id,
    }
  });
  const warmTag = await prisma.tag.create({
    data: {
      name: "warm",
      userId: user.id,
    }
  });
// create categories
  const breakfast = await prisma.category.create({
    data:
    {
      name: "Breakfast",
      userId: user.id,
    }
  });
  const lunch = await prisma.category.create({
    data:
    {
      name: "Lunch",
      userId: user.id,
    }
  });
  const dinner = await prisma.category.create({
    data:
    {
      name: "Dinner",
      userId: user.id,
    }
  });
    const snack = await prisma.category.create({
      data: {
        name: "Snack",
        userId: user.id,
      },
    });

// create items
  await prisma.item.create({
    data:
    {
      name: "Tacos",
      isAvailable: true,
      isOnGroceryList: true,
      userId: user.id,
      tags: {
        connect: [{ id: warmTag.id }, { id: requiresCookingTag.id }],
      },
      categories: {
        connect: [{ id: dinner.id }],
      },
    }
  });
  await prisma.item.create({
    data:
    {
      name: "Oatmeal",
      isAvailable: true,
      isOnGroceryList: false,
      userId: user.id,
      tags: {
        connect: [{ id: warmTag.id }, { id: easyTag.id }],
      },
      categories: {
        connect: [{ id: breakfast.id }],
      },
    }
  });

  await prisma.item.create({
    data:
    {
      name: "Yogurt",
      isAvailable: false,
      isOnGroceryList: true,
      userId: user.id,
      tags: {
        connect: [{ id: coldTag.id }, { id: easyTag.id }],
      },
      categories: {
        connect: [{ id: breakfast.id }, { id: snack.id }],
      },
    }
  });

  await prisma.item.create({
    data:{
        name: "Pasta",
        isAvailable: false,
        isOnGroceryList: false,
        userId: user.id,
        tags: {
          connect: [{ id: warmTag.id }],
        },
        categories: {
          connect: [{ id: dinner.id }, { id: lunch.id }],
        },
      },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
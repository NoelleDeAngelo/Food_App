import prisma from "@/lib/db/prisma";

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
    const sweetTag = await prisma.tag.create({
      data: {
        name: "sweet",
        userId: user.id,
      },
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
    const dessert = await prisma.category.create({
        data: {
          name: "Dessert",
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
        isAvailable: true,
        isOnGroceryList: false,
        userId: user.id,
        tags: {
          connect: [{ id: warmTag.id }, { id: requiresCookingTag.id }],
        },
        categories: {
          connect: [{ id: dinner.id }, { id: lunch.id }],
        },
      },
  });

  await prisma.item.create({
      data: {
        name: "Pancakes",
        isAvailable: true,
        isOnGroceryList: false,
        userId: user.id,
        tags: {
          connect: [{ id: warmTag.id }, { id: sweetTag.id }, { id: requiresCookingTag.id }],
        },
        categories: {
          connect: [{ id: breakfast.id }],
        },
      },
    });

  await prisma.item.create({
      data: {
        name: "Apple",
        isAvailable: true,
        isOnGroceryList: false,
        userId: user.id,
        tags: {
          connect: [{ id: easyTag.id }, { id: sweetTag.id }],
        },
        categories: {
          connect: [{ id: snack.id }],
        },
      },
    });

  await prisma.item.create({
        data: {
          name: "Ice cream",
          isAvailable: true,
          isOnGroceryList: false,
          userId: user.id,
          tags: {
            connect: [{ id: easyTag.id }, { id: sweetTag.id }, { id: coldTag.id }],
          },
          categories: {
            connect: [{ id: dessert.id }],
          },
        },
  });

  await prisma.item.create({
      data: {
        name: "Cookies",
        isAvailable: true,
        isOnGroceryList: false,
        userId: user.id,
        tags: {
          connect: [{ id: requiresCookingTag.id }, { id: sweetTag.id }],
        },
        categories: {
          connect: [{ id: dessert.id }],
        },
      },
  });

  await prisma.item.create({
      data: {
        name: "Salad",
        isAvailable: true,
        isOnGroceryList: false,
        userId: user.id,
        tags: {
          connect: [{ id: easyTag.id }, { id: coldTag.id }],
        },
        categories: {
          connect: [{ id: lunch.id }],
        },
      },
  });

  await prisma.item.create({
      data: {
        name: "Quesadilla",
        isAvailable: true,
        isOnGroceryList: false,
        userId: user.id,
        tags: {
          connect: [{ id: easyTag.id }, { id: requiresCookingTag.id }, { id: warmTag.id }],
        },
        categories: {
          connect: [{ id: snack.id }, { id: lunch.id }, { id: dinner.id }],
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
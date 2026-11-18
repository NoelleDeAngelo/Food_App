"use server";

import { FoodInput } from "@/types";
import { createItem, updateItem } from "@/lib/db/items";
import { revalidatePath } from "next/cache";

export async function updateFood(item: FoodInput, itemId: number) {
  const nameTrimmed = item.name.trim();

  if (!nameTrimmed || nameTrimmed.length > 150) {
    throw new Error("Invalid food name");
  }
  const userId = 1; // Replace with actual user ID from session or authentication context

  const updatedItem = await updateItem(
    userId,
    itemId,
    nameTrimmed,
    item.isAvailable,
    item.isOnGroceryList,
    item.categoryIds,
    item.tagIds,
  );
  revalidatePath("/menu");
  revalidatePath("/library");
  revalidatePath("/grocery-list");
  return updatedItem;
}

export async function createFood(item: FoodInput) {
  const nameTrimmed = item.name.trim();

  if (!nameTrimmed || nameTrimmed.length > 150) {
    throw new Error("Invalid food name");
  }
  const userId = 1; // Replace with actual user ID from session or authentication context

  const createdItem = await createItem(
    userId,
    nameTrimmed,
    item.isAvailable,
    item.isOnGroceryList,
    item.categoryIds,
    item.tagIds,
  );
  revalidatePath("/menu");
  revalidatePath("/library");
  revalidatePath("/grocery-list");
  return createdItem;
}

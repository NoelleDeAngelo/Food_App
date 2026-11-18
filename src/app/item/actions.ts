"use server";

import { FoodInput } from "@/types";
import { updateItem } from "@/lib/db/items";

export async function updateFood(item: FoodInput, itemId: number) {
  const nameTrimmed = item.name.trim();

  if (!nameTrimmed || nameTrimmed.length > 150) {
    throw new Error("Invalid food name");
  }
  const userId = 1; // Replace with actual user ID from session or authentication context

  return await updateItem(
    userId,
    itemId,
    nameTrimmed,
    item.isAvailable,
    item.isOnGroceryList,
    item.categoryIds,
    item.tagIds,
  );
}

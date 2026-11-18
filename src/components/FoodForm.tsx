"use client";
import {
  CategorySummary,
  TagSummary,
  ItemWithTagsAndCategories,
  FoodInput,
} from "@/types";
import styles from "./FoodForm.module.css";
import { useState } from "react";
import { updateFood } from "@/app/item/actions";

// TODO: implement a way to add new tags

export default function FoodForm({
  item,
  allCategories,
  allTags,
}: {
  item: ItemWithTagsAndCategories;
  allCategories: CategorySummary[];
  allTags: TagSummary[];
}) {
  const [foodChanged, setFoodChanged] = useState(false);

  // _____Category logic_____
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(
    () => new Set(item?.categories.map((category) => category.id) ?? []),
  );

  const handleCategoryClick = (categoryId: number) => {
    setFoodChanged(true);
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // _____Tag logic_____
  const [selectedTags, setSelectedTags] = useState<Set<number>>(
    () => new Set(item?.tags.map((tag) => tag.id) ?? []),
  );

  const handleTagClick = (tagId: number) => {
    setFoodChanged(true);
    setSelectedTags((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tagId)) {
        newSet.delete(tagId);
      } else {
        newSet.add(tagId);
      }
      return newSet;
    });
  };

  //_____Toggle logic_____
  const [isAvailable, setIsAvailable] = useState(item?.isAvailable);
  const [isOnGroceryList, setIsOnGroceryList] = useState(item?.isOnGroceryList);
  const handleAvailabilityToggle = () => {
    setFoodChanged(true);
    setIsAvailable((prev) => !prev);
  };

  const handleGroceryListToggle = () => {
    setFoodChanged(true);
    setIsOnGroceryList((prev) => !prev);
  };

  //_____Form submission logic_____
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const food: FoodInput = {
      name: String(formData.get("name") ?? ""),
      categoryIds: [...selectedCategories],
      tagIds: [...selectedTags],
      isAvailable: isAvailable,
      isOnGroceryList: isOnGroceryList,
    };

    setIsSaving(true);

    try {
      await updateFood(food, item.id);
      setFoodChanged(false);
      console.log("Food updated successfully");
    } catch (error) {
      console.error("Error updating food:", error);
    } finally {
      setIsSaving(false);
    }
  }

  //_____ Render _____
  return (
    <div className={styles.foodForm}>
      <form onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="name">
          Food Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={item.name}
          required
          onChange={() => setFoodChanged(true)}
        />

        {/*_____ Categories _____ */}
        <div className={styles.field}>
          <span className={styles.label}>Categories</span>

          <div className={styles.chipGroup}>
            {allCategories.map((category) => {
              const isSelected = selectedCategories.has(category.id);

              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isSelected}
                  className={`${styles.chip} ${
                    isSelected ? styles.chipSelected : ""
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/*_____ Tags _____ */}
        <div className={styles.field}>
          <span className={styles.label}>Tags</span>

          <div className={styles.tagGroup}>
            {allTags.map((tag) => {
              const isSelected = selectedTags.has(tag.id);

              return (
                <button
                  key={tag.id}
                  type="button"
                  aria-pressed={isSelected}
                  className={`${styles.tag} ${
                    isSelected ? styles.tagSelected : ""
                  }`}
                  onClick={() => handleTagClick(tag.id)}
                >
                  {tag.name}
                </button>
              );
            })}
            <button type="button" className={styles.addTagButton}>
              + Add tag
            </button>
          </div>
        </div>

        {/* _____ Availability and Grocery List _____ */}
        <div className={styles.field}>
          <label className={styles.toggleRow}>
            <span className={styles.toggleLabel}>
              <span>Available to eat</span>
              <span className={styles.toggleDescription}>
                Show this food on your Menu
              </span>
            </span>
            <input
              type="checkbox"
              name="isAvailable"
              className={styles.toggle}
              checked={isAvailable}
              onChange={handleAvailabilityToggle}
            />
          </label>

          <label className={styles.toggleRow}>
            <span className={styles.toggleLabel}>
              <span>On grocery list</span>
              <span className={styles.toggleDescription}>
                Add this food to your shopping list
              </span>
            </span>
            <input
              type="checkbox"
              name="isOnGroceryList"
              className={styles.toggle}
              checked={isOnGroceryList}
              onChange={handleGroceryListToggle}
            />
          </label>
        </div>
        {/* _____ Save Button _____ */}
        <button
          className={styles.saveButton}
          disabled={!foodChanged || isSaving}
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

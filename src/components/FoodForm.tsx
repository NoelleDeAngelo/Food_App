"use client";

import {
  CategorySummary,
  ItemWithTagsAndCategories,
  TagSummary,
} from "@/types";
import styles from "./FoodForm.module.css";
import { useState } from "react";

export default function FoodForm({
  item,
  allCategories,
  allTags,
}: {
  item: ItemWithTagsAndCategories;
  allCategories: CategorySummary[];
  allTags: TagSummary[];
}) {
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(
    () => new Set(item?.categories.map((category) => category.id) ?? []),
  );

  const handleCategoryClick = (categoryId: number) => {
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

  const handleTagClick = (tagId: number) => {
    // Logic to handle tag selection/deselection
  };

  return (
    <div className={styles.foodForm}>
      <form>
        <label htmlFor="name">Food Name</label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={item.name}
          required
        />
        {/* Categories */}
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

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

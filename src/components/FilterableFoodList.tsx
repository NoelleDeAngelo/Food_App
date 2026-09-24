"use client";

import type { ItemWithTagsAndCategories, CategorySummary, TagSummary } from "@/types";
import CategoryChip from "./CategoryChip";
import FoodCard from "./FoodCard";
import styles from "./FilterableFoodList.module.css";
import { useState } from "react";
import FilterOptions from "./FilterOptions";
import FilterButton from "./FilterButton";

// Todo: update style so selected category and tags are visually indicated

export default function FilterableFoodList({
  categories,
  items,
  tags,
}: {
  categories: CategorySummary[];
  items: ItemWithTagsAndCategories[];
  tags: TagSummary[];
  }) {

  const [selectedCategory, setSelectedCategory] = useState<CategorySummary | null>(null);

  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const [filterOptionsShowing, setFilterOptionsShowing] = useState(false);

  const filteredItems = items.filter((item) => {
    let list;
    if (!selectedCategory) {
      list = selectedTags.every((tagId) => item.tags.some((tag) => tag.id === tagId));
    } else {
      list =
        item.categories.some((cat) => cat.id === selectedCategory.id) &&
        selectedTags.every((tagId) =>
          item.tags.some((tag) => tag.id === tagId),
        );
    }

    return list
  });


  const toggleFilterOptionsShowing = () => {
    setFilterOptionsShowing((prev) => !prev);
  };

  const toggleTag = (tagId: number) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };



  const handleCategoryClick = (category: CategorySummary| null) => {
    if (category === null) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };



  return (
    <div className={styles.filterableFoodList}>
      <div className={styles.categories}>
        <div className={styles.chip} onClick={() => handleCategoryClick(null)}><span>All</span></div>
        {categories.map((category) => (
          <CategoryChip key={category.id} category={category} onClick={() => handleCategoryClick(category)} />
        ))}
      </div>
      <FilterButton onClick={toggleFilterOptionsShowing} />
      {filterOptionsShowing && (<FilterOptions tags={tags} onClick={toggleTag} />)}

      {filteredItems.map((item) => (
        <FoodCard key={item.id} name={item.name} tags={item.tags} />
      ))}
    </div>
  );
}




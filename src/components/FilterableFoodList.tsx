"use client";

import type { ItemWithTagsAndCategories, CategorySummary } from "@/types";
import CategoryChip from "./CategoryChip";
import FoodCard from "./FoodCard";
import styles from "./FilterableFoodList.module.css";
import { useState } from "react";


export default function FilterableFoodList({
  categories,
  items,
}: {
  categories: CategorySummary[];
  items: ItemWithTagsAndCategories[];
  }) {

  const [selectedCategory, setSelectedCategory] = useState<CategorySummary | null>(null);

  const[filteredItems, setFilteredItems] = useState<ItemWithTagsAndCategories[]>(items);


  const handleCategoryClick = (category: CategorySummary| null) => {
    if (category === null) {
      setSelectedCategory(null);
      setFilteredItems(items);
    } else {
      setSelectedCategory(category);
      setFilteredItems(items.filter((item) => item.categories.some((cat) => cat.id === category.id)));
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
      {filteredItems.map((item) => (
        <FoodCard key={item.id} name={item.name} tags={item.tags} />
      ))}
    </div>
  );
}

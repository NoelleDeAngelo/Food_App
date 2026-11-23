"use client";

import type {
  ItemWithTagsAndCategories,
  CategorySummary,
  TagSummary,
} from "@/types";
import CategoryChip from "./CategoryChip";
import FoodCard from "./FoodCard";
import styles from "./FilterableFoodList.module.css";
import { useState } from "react";
import FilterOptions from "./FilterOptions";
import { LiaSlidersHSolid } from "react-icons/lia";

export default function FilterableFoodList({
  categories,
  items,
  tags,
  showTags,
  hasSearch,
}: {
  categories: CategorySummary[];
  items: ItemWithTagsAndCategories[];
  tags: TagSummary[];
  showTags?: boolean;
  hasSearch?: boolean;
}) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategorySummary | null>(null);

  //____filter logic_____
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const [filterOptionsShowing, setFilterOptionsShowing] = useState(false);

  const filteredItems = items.filter((item) => {
    let list;
    if (!selectedCategory) {
      list = selectedTags.every((tagId) =>
        item.tags.some((tag) => tag.id === tagId),
      );
    } else {
      list =
        item.categories.some((cat) => cat.id === selectedCategory.id) &&
        selectedTags.every((tagId) =>
          item.tags.some((tag) => tag.id === tagId),
        );
    }

    return list;
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

  const clearAllTags = () => {
    setSelectedTags([]);
  };

  const handleCategoryClick = (category: CategorySummary | null) => {
    if (category === null) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  //____search logic_____
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredItemsBySearch = filteredItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  //_____rendering_____
  return (
    <div className={styles.filterableFoodList}>
      <div className={styles.searchBar}>
        {hasSearch && (
          <input
            type="text"
            placeholder="Search for a food..."
            className={styles.searchInput}
            onChange={handleSearchChange}
            value={searchQuery}
          />
        )}
      </div>
      <div className={styles.categories}>
        <div
          className={`${styles.chip} ${!selectedCategory ? styles.selected : ""}`}
          onClick={() => handleCategoryClick(null)}
        >
          <span>All</span>
        </div>
        {categories.map((category) => (
          <CategoryChip
            key={category.id}
            category={category}
            isSelected={selectedCategory?.id === category.id}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
      </div>
      <button
        className={styles.filterButton}
        onClick={toggleFilterOptionsShowing}
      >
        <LiaSlidersHSolid /> Filter
      </button>
      {filterOptionsShowing && (
        <FilterOptions
          tags={tags}
          selectedTags={selectedTags}
          optionsNumber={filteredItemsBySearch.length}
          onClick={toggleTag}
          onClose={toggleFilterOptionsShowing}
          onClearAll={clearAllTags}
        />
      )}

      {filteredItemsBySearch.map((item) => (
        <FoodCard
          key={item.id}
          name={item.name}
          tags={item.tags}
          id={item.id}
          showTags={showTags}
        />
      ))}
    </div>
  );
}

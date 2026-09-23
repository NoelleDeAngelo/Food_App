import type { ItemWithTagsAndCategories, CategorySummary } from "@/types";
import CategoryChip from "./CategoryChip";
import FoodCard from "./FoodCard";
import styles from "./FilterableFoodList.module.css";

export default function FilterableFoodList({
  categories,
  items,
}: {
  categories: CategorySummary[];
  items: ItemWithTagsAndCategories[];
  }) {
  
  return (
    <div className={styles.filterableFoodList}>
      <div className={styles.categories}>
        {categories.map((category) => (
          <CategoryChip key={category.id} category={category} />
        ))}
      </div>
      {items.map((item) => (
        <FoodCard key={item.id} name={item.name} tags={item.tags} />
      ))}
    </div>
  );
}

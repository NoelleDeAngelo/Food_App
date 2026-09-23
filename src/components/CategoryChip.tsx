import type { CategorySummary } from "@/types";
import styles from "./CategoryChip.module.css";

export default function CategoryChip({ category }: { category: CategorySummary }) {
  return (
    <div className={styles.categoryChip}>
      <span>{category.name}</span>
    </div>
  );
}
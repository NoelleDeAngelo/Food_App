import type { CategorySummary } from "@/types";
import styles from "./CategoryChip.module.css";

export default function CategoryChip({ category, onClick }: { category: CategorySummary; onClick: () => void }) {
  return (
    <div className={styles.categoryChip} onClick={onClick}>
      <span>{category.name}</span>
    </div>
  );
}
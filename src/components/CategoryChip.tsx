import type { CategorySummary } from "@/types";
import styles from "./CategoryChip.module.css";


export default function CategoryChip({ category, isSelected, onClick }: { category: CategorySummary; isSelected: boolean; onClick: () => void }) {
  return (
    <div className={`${styles.categoryChip} ${isSelected ? styles.selected : ""}`} onClick={onClick}>
      <span>{category.name}</span>
    </div>
  );
}
import { Category } from "../../generated/prisma/client"
import styles from "./CategoryChip.module.css";

export default function CategoryChip({ category }: { category: Category }) {
  return (
    <div className={styles.categoryChip}>
      <span>{category.name}</span>
    </div>
  );
}
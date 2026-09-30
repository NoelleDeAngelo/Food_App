import type { TagSummary } from "@/types";
import styles from "./FilterOptions.module.css";



export default function FilterOptions({ tags,  selectedTags, onClick }: { tags: TagSummary[], selectedTags: number[], onClick: (tagId: number) => void }) {
  return (
    <div className={styles.filterOptions}>
      {tags.map((tag) => (
        <button key={tag.id} onClick={() => onClick(tag.id)} className={`${styles.filterButton} ${selectedTags.includes(tag.id) ? styles.selected : ""}`}>
          {tag.name}
        </button>
      ))}
    </div>
  );
}
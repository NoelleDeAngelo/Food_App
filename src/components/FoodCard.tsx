import { TagSummary } from "@/types";
import TagPill from "./TagPill";
import styles from "./FoodCard.module.css";
import Link from "next/link";

type FoodCardProps = {
  name: string;
  tags: TagSummary[];
  id: number;
  showTags?: boolean;
};

export default function FoodCard({
  name,
  tags,
  id,
  showTags = false,
}: FoodCardProps) {
  return (
    <Link href={`/item/${id}`}>
      <div className={styles.foodCard}>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.tags}>
          {showTags && tags.map((tag) => (
            <TagPill key={tag.id} tag={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}

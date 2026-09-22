import type { Tag } from "../../generated/prisma/client";
import TagPill from "./TagPill";
import styles from "./FoodCard.module.css";

type FoodCardProps = {
  name: string;
  tags: Pick<Tag, "id" | "name">[];
};

export default function FoodCard({ name, tags }: FoodCardProps) {
  return (
    <div className={styles.foodCard}>
      <h2 className={styles.name}>{name}</h2>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <TagPill key={tag.id} name={tag.name} />
        ))}
      </div>
    </div>
  );
}

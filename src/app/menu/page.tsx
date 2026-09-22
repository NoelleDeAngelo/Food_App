import styles from "./menu.module.css";
import FoodCard from "@/components/FoodCard";
import CategoryChip from "@/components/CategoryChip";
import { getAvailableUserItems } from "@/lib/db/items";
import { getUserCategories } from "@/lib/db/categories";

export default async function Menu() {
  const items = await getAvailableUserItems(1);
  const categories = await getUserCategories(1);
  return (
    <div className={styles.page}>
      <h1>Menu</h1>
      <p className={styles.subheading}>What are you in the mood for?</p>
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

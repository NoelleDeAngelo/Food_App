import styles from "./menu.module.css";
import { getAvailableUserItems } from "@/lib/db/items";
import { getUserCategories } from "@/lib/db/categories";
import { getUserTags } from "@/lib/db/tags";
import FilterableFoodList from "@/components/FilterableFoodList";

export default async function Menu() {
  const items = await getAvailableUserItems(1);
  const categories = await getUserCategories(1);
  const tags = await getUserTags(1);

  return (
    <div className={styles.page}>
      <h1>Menu</h1>
      <p className={styles.subheading}>What are you in the mood for?</p>
      <FilterableFoodList categories={categories} items={items} tags={tags} />
    </div>
  );
}

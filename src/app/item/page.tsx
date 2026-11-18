import FoodForm from "@/components/FoodForm";
import styles from "./item.module.css";
import BottomNav from "@/components/BottomNav";
import { getUserTags } from "@/lib/db/tags";
import { getUserCategories } from "@/lib/db/categories";

export default async function Item() {
  const categories = await getUserCategories(1); // Replace 1 with the actual user ID

  const tags = await getUserTags(1); // Replace 1 with the actual user ID

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Edit Food</h1>
      <FoodForm
        createNewFood={true}
        allCategories={categories}
        allTags={tags}
      />
      <BottomNav />
    </div>
  );
}

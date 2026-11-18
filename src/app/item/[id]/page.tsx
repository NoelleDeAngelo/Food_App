import { getUsersItemById } from "@/lib/db/items";
import { getUserCategories } from "@/lib/db/categories";
import { getUserTags } from "@/lib/db/tags";
import styles from "../item.module.css";
import BottomNav from "@/components/BottomNav";
import { notFound } from "next/navigation";
import FoodForm from "@/components/FoodForm";

export default async function Item({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const itemId = Number(id);

  const item = await getUsersItemById(itemId, 1); // Replace 1 with the actual user ID
  if (!item) {
    notFound();
  }

  const categories = await getUserCategories(1); // Replace 1 with the actual user ID

  const tags = await getUserTags(1); // Replace 1 with the actual user ID

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Edit Food</h1>
      <FoodForm
        createNewFood={false}
        item={item}
        allCategories={categories}
        allTags={tags}
      />
      <BottomNav />
    </div>
  );
}

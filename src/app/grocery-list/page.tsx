import BottomNav from "@/components/BottomNav";
import styles from "./grocery-list.module.css";
import FilterableFoodList from "@/components/FilterableFoodList";
import { getUserTags } from "@/lib/db/tags";
import { getUserCategories } from "@/lib/db/categories";
import { getGroceryListUserItems } from "@/lib/db/items";

export default async function GroceryListPage() {
  const items = await getGroceryListUserItems(1);
  const categories = await getUserCategories(1);
  const tags = await getUserTags(1);

  return (
    <div className="app_page">
      <h1>Grocery List</h1>
      <p className="subheading">List of foods or meals to buy.</p>
      <FilterableFoodList
        categories={categories}
        items={items}
        tags={tags}
        showTags={false}
        hasSearch={false}
      />
      <BottomNav />
    </div>
  );
}

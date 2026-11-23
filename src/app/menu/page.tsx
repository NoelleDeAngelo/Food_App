import styles from "./menu.module.css";
import BottomNav from "@/components/BottomNav";
import { getAvailableUserItems } from "@/lib/db/items";
import { getUserCategories } from "@/lib/db/categories";
import { getUserTags } from "@/lib/db/tags";
import FilterableFoodList from "@/components/FilterableFoodList";

export default async function Menu() {
  const items = await getAvailableUserItems(1);
  const categories = await getUserCategories(1);
  const tags = await getUserTags(1);

  return (
    <div className="app_page">
      <h1>Menu</h1>
      <p className="subheading">What are you in the mood for?</p>
      <FilterableFoodList
        categories={categories}
        items={items}
        tags={tags}
        showTags={true}
        hasSearch={false}
      />
      <BottomNav />
    </div>
  );
}

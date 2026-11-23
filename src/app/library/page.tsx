import { getUserTags } from "@/lib/db/tags";
import styles from "./library.module.css";
import BottomNav from "@/components/BottomNav";
import { getUserCategories } from "@/lib/db/categories";
import { getAllUserItems } from "@/lib/db/items";
import FilterableFoodList from "@/components/FilterableFoodList";

export default async function Library() {
  const items = await getAllUserItems(1);
  const categories = await getUserCategories(1);
  const tags = await getUserTags(1);

  return (
    <div className="app_page">
      <h1>Library</h1>
      <p className="subheading">A collection of all your foods.</p>
      <FilterableFoodList
        items={items}
        categories={categories}
        tags={tags}
        showTags={false}
        hasSearch={true}
      />
      <BottomNav />
    </div>
  );
}

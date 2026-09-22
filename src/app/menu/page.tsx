import styles from "./menu.module.css";
import FoodCard from "@/components/FoodCard";
import {getAvailableUserItems} from "@/lib/db/item";

export default async function Menu() {
  const items = await getAvailableUserItems(1);
  return (
    <div className={styles.page}>
    <h1>Menu</h1>
      {items.map((item) => (
        <FoodCard key={item.id} name={item.name} />
      ))}
    </div>
  );
}

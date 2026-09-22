import styles from "./menu.module.css";
import FoodCard from "@/components/FoodCard";
import {getAvailableUserItems} from "@/lib/db/items";

export default async function Menu() {
  const items = await getAvailableUserItems(1);
  return (
    <div className={styles.page}>
      <h1>Menu</h1>
      <p className={styles.subheading}>What are you in the mood for?</p>
      {items.map((item) => (
        <FoodCard key={item.id} name={item.name} tags={item.tags} />
      ))}
    </div>
  );
}

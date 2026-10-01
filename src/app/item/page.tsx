import styles from "./item.module.css";
import BottomNav from "@/components/BottomNav";

export default function Item() {
  return (
    <div className={styles.page}>
      <h1>Food Item</h1>
      <p>Details of the food item will go here.</p>
      <BottomNav />
    </div>
  );
}

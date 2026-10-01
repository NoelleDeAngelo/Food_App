import styles from "./library.module.css";
import BottomNav from "@/components/BottomNav";

export default function Library() {
  return (
    <div className={styles.page}>
      <h1>Library</h1>
      <p>List of all user entered foods will go here.</p>
      <BottomNav />
    </div>
  );
}

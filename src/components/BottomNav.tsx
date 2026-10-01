import Link from "next/link";
import styles from "./BottomNav.module.css";
import {
  IoRestaurantOutline,
  IoCartOutline,
  IoAddCircle,
  IoLibraryOutline,
  IoEllipsisHorizontalSharp,
} from "react-icons/io5";

export default function BottomNav() {
  return (
    <nav className={styles.bottomNav}>
      <Link href="/menu" className={styles.navItem}>
        <IoRestaurantOutline className={styles.navIcon} />
        <span className={styles.navText}>Menu</span>
      </Link>
      <Link href="/grocery-list" className={styles.navItem}>
        <IoCartOutline className={styles.navIcon} />
        <span className={styles.navText}>
          Grocery
          <br />
          List
        </span>
      </Link>
      <Link href="/item" aria-label="Add item">
        <IoAddCircle className={styles.AddItem} />
      </Link>
      <Link href="/library" className={styles.navItem}>
        <IoLibraryOutline className={styles.navIcon} />
        <span className={styles.navText}> Library</span>
      </Link>
      <Link href="/profile" className={styles.navItem}>
        <IoEllipsisHorizontalSharp className={styles.navIcon} />
        <span className={styles.navText}>More</span>
      </Link>
    </nav>
  );
}

import styles from "./profile.module.css";
import BottomNav from "@/components/BottomNav";

export default function Profile() {
  return (
    <div className={styles.page}>
      <h1>Profile</h1>
      <p>User profile and settings will go here.</p>
      <BottomNav />
    </div>
  );
}

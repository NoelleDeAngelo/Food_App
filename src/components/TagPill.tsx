import styles from "./TagPill.module.css";

type TagPillProps = {
  name: string;
};

export default function TagPill({ name }: TagPillProps) {
  return <span className={styles.tagPill}>{name}</span>;
}

import styles from "./TagPill.module.css";
import type { TagSummary } from "@/types";

export default function TagPill({ tag }: { tag: TagSummary }) {
  return <span className={styles.tagPill}>{tag.name}</span>;
}

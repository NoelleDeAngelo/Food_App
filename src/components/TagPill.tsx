import styles from "./TagPill.module.css";
import type { TagSummary } from "@/types";

const colors = [
  styles.sage,
  styles.yellow,
  styles.lavender,
  styles.blush,
  styles.blue,
];

export default function TagPill({ tag }: { tag: TagSummary }) {
  const colorClass = colors[tag.id % colors.length];
  return <span className={`${styles.tagPill} ${colorClass}`}>{tag.name}</span>;
}

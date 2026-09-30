import type { TagSummary } from "@/types";
import styles from "./FilterOptions.module.css";
import { useRef, useState } from "react";

export default function FilterOptions({
  tags,
  selectedTags,
  optionsNumber,
  onClick,
  onClose,
  onClearAll,
}: {
  tags: TagSummary[];
  selectedTags: number[];
  optionsNumber: number;
  onClick: (tagId: number) => void;
  onClose: () => void;
  onClearAll: () => void;
  })
{


// Drag-to-close functionality
const startY = useRef(0);
const [dragY, setDragY] = useState(0);

const handlePointerDown = (e: React.PointerEvent) => {
  startY.current = e.clientY;
  e.currentTarget.setPointerCapture(e.pointerId);
}

const handlePointerMove = (e: React.PointerEvent) => {
  if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;

  const distance = e.clientY - startY.current;

  if (distance > 0) {
    setDragY(distance);
  }
}

const handlePointerUp = (e: React.PointerEvent) => {
  e.currentTarget.releasePointerCapture(e.pointerId);

  if (dragY > 100) {
    onClose();
  } else {
    setDragY(0);
  }
}




  return (
    <div className={styles.overlay}>
      <div
        className={styles.sheet}
        style={{ transform: `translateY(${dragY}px)` }}
      >
        <div
          className={styles.dragArea}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className={styles.handle}></div>
        </div>

        <h2 className={styles.title}>Filter your options</h2>
        <button type="button" className={styles.clearAll} onClick={()=>onClearAll()}>
          Clear all
        </button>
        <div className={styles.filterOptions}>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onClick(tag.id)}
              className={`${styles.filterButton} ${
                selectedTags.includes(tag.id) ? styles.selected : ""
              }`}
            >
              {tag.name}
            </button>
          ))}
          <button onClick={onClose} className={styles.closeButton}>
            Show {optionsNumber} Options
          </button>
        </div>
      </div>
    </div>
  );
}
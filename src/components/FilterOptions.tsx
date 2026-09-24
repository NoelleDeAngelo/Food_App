import type { TagSummary } from "@/types";



export default function FilterOptions({ tags, onClick }: { tags: TagSummary[], onClick: (tagId: number) => void }) {
  return (
    <div>
      {tags.map((tag) => (
        <button key={tag.id} onClick={() => onClick(tag.id)}>
          {tag.name}
        </button>
      ))}
    </div>
  );
}
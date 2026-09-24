
export default function FilterButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={() => onClick()}>
      Filter
    </button>
  );
}
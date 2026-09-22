type FoodCardProps = {
  name: string;
};

export default function FoodCard({ name }: FoodCardProps) {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
}

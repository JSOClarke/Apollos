import UniversalDropdown from "./UniversalDropdown/UniversalDropdown";

type WithNumber = {
  amount: number;
};

type ListDisplayProps<T extends WithNumber> = {
  title: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
};

export default function ListDisplay<T extends WithNumber>({
  title,
  items,
  renderItem,
}: ListDisplayProps<T>) {
  if (!items || items.length === 0) return null;
  const totalValue = items.reduce((sum, i) => sum + i.amount, 0);

  return (
    <UniversalDropdown title={title} titleValue={totalValue}>
      <div>{items.map(renderItem)}</div>
    </UniversalDropdown>
  );
}

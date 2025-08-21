import { formatCurrency } from "../../../helpers/normalHelpers";

interface UniversalDropdownItemProps {
  itemTitle: string;
  itemValue: number;
}

export default function UniversalDropdownItem({
  itemTitle,
  itemValue,
}: UniversalDropdownItemProps) {
  return (
    <div className="dropdown-item-container flex items-center justify-between">
      <div className="dropdown-item-title-text text-gray-500">{itemTitle}</div>
      <div className="dropdown-item-value text-gray-500">
        {formatCurrency(itemValue)}
      </div>
    </div>
  );
}

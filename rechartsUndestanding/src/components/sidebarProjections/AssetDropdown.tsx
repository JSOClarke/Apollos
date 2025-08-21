import type { Asset } from "../../types/types";
import UniversalDropdown from "./UniversalDropdown/UniversalDropdown";
import UniversalDropdownItem from "./UniversalDropdown/UniversalDropdownItem";

interface AssetDropdownProps {
  assets: Asset[] | null;
}

export default function AssetDropdown({ assets }: AssetDropdownProps) {
  if (!assets || assets.length === 0) return null;
  const totalIncome = assets.reduce((sum, i) => sum + i.amount, 0);
  return (
    <UniversalDropdown title="Assets" titleValue={totalIncome}>
      {assets.map((item) => {
        return (
          <ul key={item.id}>
            {item.name} - {item.amount}
          </ul>
          // <UniversalDropdownItem
          //   key={item.id}
          //   itemTitle={item.name}
          //   itemValue={item.amount}
          // />
        );
      })}
    </UniversalDropdown>
  );
}

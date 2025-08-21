import type { Incomes } from "../../types/types";
import UniversalDropdown from "./UniversalDropdown/UniversalDropdown";
import UniversalDropdownItem from "./UniversalDropdown/UniversalDropdownItem";

interface IncomeDropdownProps {
  incomes: Incomes[] | null;
}

export default function IncomeDropdown({ incomes }: IncomeDropdownProps) {
  if (!incomes || incomes.length === 0) return null;
  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  return (
    <UniversalDropdown title="Income" titleValue={totalIncome}>
      {incomes.map((item) => {
        return (
          <UniversalDropdownItem
            key={item.id}
            itemTitle={item.name}
            itemValue={item.amount}
          />
        );
      })}
    </UniversalDropdown>
  );
}

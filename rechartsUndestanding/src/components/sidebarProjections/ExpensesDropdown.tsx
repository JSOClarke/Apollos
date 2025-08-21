import type { Expenses } from "../../types/types";
import UniversalDropdown from "./UniversalDropdown/UniversalDropdown";
import UniversalDropdownItem from "./UniversalDropdown/UniversalDropdownItem";

interface ExpensesDropdownProps {
  expenses: Expenses[] | null;
}

export default function ExpensesDropdown({ expenses }: ExpensesDropdownProps) {
  if (!expenses || expenses.length === 0) return null;
  const totalExpenses = expenses.reduce((sum, i) => sum + i.amount, 0);
  return (
    <UniversalDropdown title="Expenses" titleValue={totalExpenses}>
      {expenses.map((item) => {
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

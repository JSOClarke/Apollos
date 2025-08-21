import type { YearlyProjection } from "../../types/types";

interface YearSelectorProps {
  yearlyProjectionData: YearlyProjection[];
  yearSelected: number;
  setYearSelected: (year: number) => void;
}

export default function YearSelector({
  yearlyProjectionData,
  yearSelected,
  setYearSelected,
}: YearSelectorProps) {
  return (
    <div className="selector-container">
      <select
        name="year-selector"
        id="year-selector"
        className="w-full"
        value={yearSelected}
        onChange={(e) => setYearSelected(Number(e.target.value))}
      >
        {yearlyProjectionData.map((year) => {
          return (
            <option
              className="w-full"
              key={year.year}
              value={year.year}
            >{`Year ${year.year}`}</option>
          );
        })}
      </select>
    </div>
  );
}

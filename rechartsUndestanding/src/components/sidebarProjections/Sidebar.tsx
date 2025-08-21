import type { YearlyProjection } from "../../types/types";
import { useState } from "react";
import ListDisplay from "./ListDisplay";
import UniversalDropdownItem from "./UniversalDropdown/UniversalDropdownItem";
import YearSelector from "./YearSelector";

interface SidebarProps {
  yearlyProjectionData: YearlyProjection[];
  yearSelected: number;
  setYearSelected: (year: number) => void;
}

export default function Sidebar({
  yearlyProjectionData,
  yearSelected,
  setYearSelected,
}: SidebarProps) {
  const filteredYearProjectionData: YearlyProjection | null =
    yearlyProjectionData.find((yearData) => yearData.year == yearSelected) ||
    null;

  console.log("filtered year projection", filteredYearProjectionData);

  function findAssetName(assetId: number) {
    const asset = filteredYearProjectionData?.assets.find(
      (a) => a.id === assetId
    );
    return asset?.name;
  }

  return (
    <div className="sidebar-container bg-[#fcfcfc] w-full h-full rounded-xl p-4">
      <div className="w-full">
        <YearSelector
          yearlyProjectionData={yearlyProjectionData}
          yearSelected={yearSelected}
          setYearSelected={setYearSelected}
        />
      </div>
      <ListDisplay
        title="Assets"
        items={filteredYearProjectionData?.assets}
        renderItem={(item) => (
          <UniversalDropdownItem
            key={item.id}
            itemTitle={item.name}
            itemValue={item.amount}
          />
        )}
      />
      <ListDisplay
        title="Income"
        items={filteredYearProjectionData?.incomeBreakdown}
        renderItem={(item, idx) => (
          <UniversalDropdownItem
            key={idx}
            itemTitle={`${item.name}`}
            itemValue={item.amount}
          />
        )}
      />

      <ListDisplay
        title="Expenses"
        items={filteredYearProjectionData?.expenseBreakdown}
        renderItem={(item, idx) => (
          <UniversalDropdownItem
            key={idx}
            itemTitle={`${item.name}`}
            itemValue={item.amount}
          />
        )}
      />
      <ListDisplay
        title="Investment Growth "
        items={filteredYearProjectionData?.growthHistory}
        renderItem={(item, idx) => (
          <UniversalDropdownItem
            key={idx}
            itemTitle={`${findAssetName(item.assetId)}`}
            itemValue={item.amount}
          />
        )}
      />
      <ListDisplay
        title="Surplus "
        items={filteredYearProjectionData?.surplusHistory}
        renderItem={(item, idx) => (
          <UniversalDropdownItem
            key={idx}
            itemTitle={`${findAssetName(item.assetId)}`}
            itemValue={item.amount}
          />
        )}
      />
      <ListDisplay
        title="Passive Income Yield"
        items={filteredYearProjectionData?.passiveIncomesHistory}
        renderItem={(item, idx) => (
          <UniversalDropdownItem
            key={idx}
            itemTitle={`${findAssetName(item.fromAssetId)} `}
            itemValue={item.amount}
          />
        )}
      />
    </div>
  );
}

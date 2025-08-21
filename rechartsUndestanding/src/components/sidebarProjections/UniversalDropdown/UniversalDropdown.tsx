import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { formatCurrency } from "../../../helpers/normalHelpers";
interface UnivesalDropdownProps {
  title: string;
  titleValue: number;
  children?: React.ReactNode;
}

export default function UniversalDropdown({
  title,
  titleValue,
  children,
}: UnivesalDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  function handleDropdownToggle() {
    setIsDropdownOpen((prev) => !prev);
  }
  return (
    <div
      className={`dropdown-container flex-col w-full rounded-xl p-2 ${
        isHovered && "bg-[#f0f0f0]"
      } ${isDropdownOpen && "bg-[#f0f0f0]"}`}
    >
      <button
        onClick={() => handleDropdownToggle()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="title-container flex items-center justify-between w-full"
      >
        <div className="title-text text-gray-500">{title}</div>
        {!isDropdownOpen ? (
          <div className="title-value text-gray-500">
            {formatCurrency(titleValue)}
          </div>
        ) : null}
        <div className="chevron text-gray-500">
          {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
      </button>
      <div className="dropdownItems">{isDropdownOpen ? children : null}</div>
    </div>
  );
}

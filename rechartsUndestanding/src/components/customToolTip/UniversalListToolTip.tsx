interface UniversalListToolTipProps {
  title: string;
  value: number | string;
}

export default function UniversalListToolTip({
  title,
  value,
}: UniversalListToolTipProps) {
  return (
    <div className="tooltip-container">
      <div className="title">{title}</div>
      <div className="value">{value}</div>
    </div>
  );
}

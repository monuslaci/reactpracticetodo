const statusStyles = {
  completed: "bg-[var(--green-bullet-transparent)] text-[var(--green-bullet)]",
  in_progress: "bg-[var(--button-bg-light-purple)] text-[var(--chart-color)]",
  pending: "bg-amber-100 text-amber-700",
  on_hold: "bg-[var(--red-bullet-transparent)] text-[var(--red-bullet)]",
  unknown: "bg-gray-100 text-gray-500",
};

const statusLabels = {
  completed: "Completed",
  in_progress: "In Progress",
  pending: "Pending",
  on_hold: "On Hold",
};

export default function StatusCell({ value }) {
  const normalizedStatus = String(value).toLowerCase().replaceAll(" ", "_");
  const style = statusStyles[normalizedStatus] || statusStyles.unknown;
  const label = statusLabels[normalizedStatus] || value;

  return (
    <div className="flex h-full items-center">
      <div
        className={`flex h-4 w-20 items-center justify-center rounded-full px-3 text-[12px] whitespace-nowrap ${style}`}
      >
        <span>{label}</span>
      </div>
    </div>
  );
}

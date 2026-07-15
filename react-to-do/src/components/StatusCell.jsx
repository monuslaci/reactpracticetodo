export default function StatusCell({ value }) {
  const isPositive = value === "Excellent" || value === "Good";

  return (
    <div className="flex h-full items-center">
      <div
        className={`flex h-4 w-15 items-center justify-center rounded-full px-3 text-[12px] whitespace-nowrap ${
          isPositive
            ? "bg-[var(--green-bullet-transparent)] text-[var(--green-bullet)]"
            : "bg-[var(--red-bullet-transparent)] text-[var(--red-bullet)]"
        }`}
      >
        <span>{value}</span>
      </div>
    </div>
  );
}
export default function ActionCell() {
  return (
    <div className="flex h-full items-center justify-center">
      <button
        type="button"
        onClick={() => console.log("Edit clicked")}
        className="cursor-pointer"
      >
        <img
          src="/actionDots.svg"
          alt="Edit"
          className="h-5 w-5"
        />
      </button>
    </div>
  );
}
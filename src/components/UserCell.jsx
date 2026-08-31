export default function UserCell({ value, data }) {
  return (
    <div className="flex items-center h-full">
      <img
        src={data.avatar}
        alt={value}
        className="w-5 h-5 rounded-full mr-3 object-cover"
      />

      <span>{value}</span>
    </div>
  );
}
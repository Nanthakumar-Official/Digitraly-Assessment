const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 rounded text-white ${
        status === "Completed" ? "bg-green-500" : "bg-yellow-500"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;

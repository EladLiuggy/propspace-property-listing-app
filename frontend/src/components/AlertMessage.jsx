const AlertMessage = ({ type = "error", message }) => {
  if (!message) return null;

  const style =
    type === "success"
      ? "bg-green-100 text-green-700 border-green-300"
      : "bg-red-100 text-red-700 border-red-300";

  return (
    <div className={`border px-4 py-3 rounded-lg mb-4 ${style}`}>
      {message}
    </div>
  );
};

export default AlertMessage;

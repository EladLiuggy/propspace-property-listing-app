const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-slate-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputField;


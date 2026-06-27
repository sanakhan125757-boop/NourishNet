const Input = ({ label, type = 'text', name, value, onChange, placeholder, required = false }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 font-medium mb-1" htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
      />
    </div>
  );
};

export default Input;

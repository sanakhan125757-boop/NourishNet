const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false, loading = false }) => {
  const variants = {
    primary: 'bg-primary hover:bg-secondary text-white shadow-lg shadow-green-200',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          Processing...
        </div>
      ) : children}
    </button>
  );
};

export default Button;

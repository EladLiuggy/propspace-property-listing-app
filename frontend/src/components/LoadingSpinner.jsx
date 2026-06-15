const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="text-center py-10">
      <p className="text-slate-600 font-medium">{text}</p>
    </div>
  );
};

export default LoadingSpinner;

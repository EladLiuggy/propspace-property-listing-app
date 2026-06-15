const EmptyState = ({ message = "No results found." }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
      <h3 className="text-xl font-bold text-slate-800 mb-2">Nothing found</h3>
      <p className="text-slate-600">{message}</p>
    </div>
  );
};

export default EmptyState;

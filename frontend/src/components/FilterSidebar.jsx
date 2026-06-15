const FilterSidebar = ({ filters, onChange, onSubmit, onReset }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-slate-200 rounded-xl shadow-sm p-5"
    >
      <h2 className="text-xl font-bold text-slate-900 mb-4">Search Filters</h2>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          City
        </label>
        <input
          type="text"
          name="city"
          value={filters.city}
          onChange={onChange}
          placeholder="Example: Douala"
          className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Minimum Price
        </label>
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={onChange}
          placeholder="100000"
          className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Maximum Price
        </label>
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={onChange}
          placeholder="300000"
          className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 mb-3"
      >
        Apply Filters
      </button>

      <button
        type="button"
        onClick={onReset}
        className="w-full border border-slate-300 text-slate-700 py-2 rounded-lg font-semibold hover:bg-slate-100"
      >
        Reset
      </button>
    </form>
  );
};

export default FilterSidebar;

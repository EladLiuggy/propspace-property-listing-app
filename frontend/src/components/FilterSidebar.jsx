const FilterSidebar = ({ filters, onChange, onSubmit, onReset }) => {
  return (
    <div className="space-y-5 lg:sticky lg:top-6">
      <form
        onSubmit={onSubmit}
        className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5"
      >
        <h2 className="text-xl font-bold text-slate-950 mb-1">
          Search Filters
        </h2>
        <p className="text-sm text-slate-500 mb-5">
          Narrow your search by location and budget.
        </p>

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
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 mb-3 transition"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full border border-slate-300 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-100 transition"
        >
          Reset
        </button>
      </form>

      <div className="bg-slate-950 text-white rounded-2xl p-5 shadow-sm">
        <h3 className="text-lg font-bold mb-3">Why use PropSpace?</h3>

        <div className="space-y-3 text-sm text-slate-300">
          <p>? Browse property listings from verified users.</p>
          <p>? Search by city and price range.</p>
          <p>? Manage your own listings securely.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h3 className="text-lg font-bold text-slate-950 mb-3">
          Search Tips
        </h3>

        <ul className="space-y-2 text-sm text-slate-600">
          <li>Use city names like Buea, Douala, or Yaounde.</li>
          <li>Leave price fields empty to see all prices.</li>
          <li>Use Reset to return to all listings.</li>
        </ul>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <h3 className="text-lg font-bold text-blue-950 mb-2">
          Safety Reminder
        </h3>

        <p className="text-sm text-blue-800 leading-6">
          Always inspect a property physically and confirm ownership details
          before making payment.
        </p>
      </div>
    </div>
  );
};

export default FilterSidebar;

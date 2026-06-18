import InputField from "./InputField";
import AlertMessage from "./AlertMessage";

const PropertyForm = ({
  formData,
  onChange,
  onSubmit,
  loading,
  error,
  buttonText = "Save Property",
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
    >
      <AlertMessage message={error} />

      <InputField
        label="Property Title"
        name="title"
        value={formData.title}
        onChange={onChange}
        placeholder="Example: Executive Apartment in Bastos"
        required
      />

      <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Describe the property clearly"
          rows="4"
          required
          className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <InputField
        label="Price"
        type="number"
        name="price"
        value={formData.price}
        onChange={onChange}
        placeholder="Example: 150000"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="City"
          name="city"
          value={formData.city}
          onChange={onChange}
          placeholder="Example: Buea"
          required
        />

        <InputField
          label="Country"
          name="country"
          value={formData.country}
          onChange={onChange}
          placeholder="Example: Cameroon"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Property Type
        </label>
        <select
          name="propertyType"
          value={formData.propertyType}
          onChange={onChange}
          required
          className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select property type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Studio">Studio</option>
        </select>
      </div>

      <InputField
        label="Image URL"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={onChange}
        placeholder="Paste a real property image link or leave empty"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-blue-300 transition"
      >
        {loading ? "Saving..." : buttonText}
      </button>
    </form>
  );
};

export default PropertyForm;


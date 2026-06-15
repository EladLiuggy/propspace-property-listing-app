import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import PropertyForm from "../components/PropertyForm";

const AddProperty = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    country: "Cameroon",
    propertyType: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.city ||
      !formData.country ||
      !formData.propertyType
    ) {
      setError("Please fill in all required property details.");
      return;
    }

    if (Number(formData.price) < 0) {
      setError("Price cannot be negative.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        city: formData.city.trim(),
        country: formData.country.trim(),
        propertyType: formData.propertyType,
        imageUrls: formData.imageUrl.trim() ? [formData.imageUrl.trim()] : [],
      };

      await api.post("/properties", payload);

      navigate("/my-listings");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to create property. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <p className="text-blue-700 font-semibold mb-2">Create Listing</p>
          <h1 className="text-4xl font-extrabold text-slate-950">
            Add Property
          </h1>
          <p className="text-slate-600 mt-2">
            Fill in the details below to publish a new property listing.
          </p>
        </div>

        <PropertyForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          buttonText="Create Property"
        />
      </div>
    </main>
  );
};

export default AddProperty;

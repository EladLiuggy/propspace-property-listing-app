import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import PropertyForm from "../components/PropertyForm";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertMessage from "../components/AlertMessage";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    country: "",
    propertyType: "",
    imageUrl: "",
  });

  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setPageLoading(true);
        setError("");

        const response = await api.get(`/properties/${id}`);
        const property = response.data.data;

        setFormData({
          title: property.title || "",
          description: property.description || "",
          price: property.price || "",
          city: property.city || "",
          country: property.country || "Cameroon",
          propertyType: property.propertyType || "",
          imageUrl:
            property.imageUrls && property.imageUrls.length > 0
              ? property.imageUrls[0]
              : "",
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load property details. Please try again."
        );
      } finally {
        setPageLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

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
      setSubmitLoading(true);

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        city: formData.city.trim(),
        country: formData.country.trim(),
        propertyType: formData.propertyType,
        imageUrls: formData.imageUrl.trim() ? [formData.imageUrl.trim()] : [],
      };

      await api.put(`/properties/${id}`, payload);

      navigate("/my-listings");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update property. Please try again."
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  if (pageLoading) {
    return <LoadingSpinner text="Loading property details..." />;
  }

  return (
    <main className="bg-slate-50 min-h-screen p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <p className="text-blue-700 font-semibold mb-2">Update Listing</p>
          <h1 className="text-4xl font-extrabold text-slate-950">
            Edit Property
          </h1>
          <p className="text-slate-600 mt-2">
            Update your property details. Changes will reflect on My Listings
            and the public Home page.
          </p>
        </div>

        <AlertMessage message={error} />

        <PropertyForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={submitLoading}
          error=""
          buttonText="Update Property"
        />
      </div>
    </main>
  );
};

export default EditProperty;


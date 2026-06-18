import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import PropertyCard from "../components/PropertyCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import AlertMessage from "../components/AlertMessage";

const MyListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoadingId, setDeleteLoadingId] = useState("");

  const fetchMyListings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/properties/my/listings");
      setProperties(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load your listings. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  const handleDelete = async (propertyId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    try {
      setDeleteLoadingId(propertyId);

      await api.delete(`/properties/${propertyId}`);

      setProperties((currentProperties) =>
        currentProperties.filter((property) => property._id !== propertyId)
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete property. Please try again."
      );
    } finally {
      setDeleteLoadingId("");
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <p className="text-blue-700 font-semibold mb-2">Private Dashboard</p>
          <h1 className="text-4xl font-extrabold text-slate-950">
            My Listings
          </h1>
          <p className="text-slate-600 mt-2">
            Manage, update, or delete the properties you have added to
            PropSpace.
          </p>
        </div>

        <Link
          to="/add-property"
          className="bg-blue-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-blue-700 transition text-center"
        >
          Add New Property
        </Link>
      </div>

      <AlertMessage message={error} />

      {loading ? (
        <LoadingSpinner text="Loading your listings..." />
      ) : properties.length === 0 ? (
        <EmptyState message="You have not created any property listings yet." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <div key={property._id} className="space-y-3">
              <PropertyCard property={property} index={index} />

              <div className="bg-white border border-slate-200 rounded-xl p-3 flex gap-3">
                <Link
                  to={`/edit-property/${property._id}`}
                  className="flex-1 text-center bg-slate-900 text-white py-2 rounded-lg font-semibold hover:bg-slate-800 transition"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(property._id)}
                  disabled={deleteLoadingId === property._id}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 disabled:bg-red-300 transition"
                >
                  {deleteLoadingId === property._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MyListings;


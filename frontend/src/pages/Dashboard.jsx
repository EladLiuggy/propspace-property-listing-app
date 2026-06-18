import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import AlertMessage from "../components/AlertMessage";

const Dashboard = () => {
  const { user } = useAuth();

  const [myListings, setMyListings] = useState([]);
  const [publicListings, setPublicListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [myListingsResponse, publicListingsResponse] = await Promise.all([
          api.get("/properties/my/listings"),
          api.get("/properties"),
        ]);

        setMyListings(myListingsResponse.data.data);
        setPublicListings(publicListingsResponse.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load dashboard data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalListingValue = myListings.reduce((sum, property) => {
    return sum + Number(property.price || 0);
  }, 0);

  const recentListings = myListings.slice(0, 3);

  if (loading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <main className="bg-slate-50 min-h-screen p-6 md:p-8">
      <section className="bg-slate-950 text-white rounded-3xl p-8 mb-8">
        <p className="text-blue-300 font-semibold mb-2">Welcome back</p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
              {user?.profileName || user?.username || "PropSpace User"}
            </h1>

            <p className="text-slate-300 max-w-2xl">
              Manage your property listings, update your profile, and monitor
              your activity from one professional dashboard.
            </p>
          </div>

          <Link
            to="/add-property"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-center transition"
          >
            Add New Property
          </Link>
        </div>
      </section>

      <AlertMessage message={error} />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p className="text-slate-500 font-semibold mb-2">My Listings</p>
          <h2 className="text-4xl font-extrabold text-slate-950">
            {myListings.length}
          </h2>
          <p className="text-slate-600 mt-2">
            Properties created by your account.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p className="text-slate-500 font-semibold mb-2">Public Listings</p>
          <h2 className="text-4xl font-extrabold text-slate-950">
            {publicListings.length}
          </h2>
          <p className="text-slate-600 mt-2">
            Total properties available on PropSpace.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p className="text-slate-500 font-semibold mb-2">My Listing Value</p>
          <h2 className="text-3xl font-extrabold text-blue-700">
            FCFA {totalListingValue.toLocaleString()}
          </h2>
          <p className="text-slate-600 mt-2">
            Combined price value of your listings.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">
                Recent Listings
              </h2>
              <p className="text-slate-600">
                Your latest properties added to the platform.
              </p>
            </div>

            <Link
              to="/my-listings"
              className="text-blue-700 font-bold hover:underline"
            >
              View all
            </Link>
          </div>

          {recentListings.length === 0 ? (
            <EmptyState message="You have not added any property yet." />
          ) : (
            <div className="space-y-4">
              {recentListings.map((property) => (
                <div
                  key={property._id}
                  className="border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <h3 className="font-bold text-slate-950 text-lg">
                      {property.title}
                    </h3>

                    <p className="text-slate-600">
                      {property.city}, {property.country} ·{" "}
                      {property.propertyType}
                    </p>
                  </div>

                  <p className="font-extrabold text-blue-700">
                    FCFA {Number(property.price).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-2xl font-bold text-slate-950 mb-2">
            Quick Actions
          </h2>

          <p className="text-slate-600 mb-5">
            Use these shortcuts to manage the system faster.
          </p>

          <div className="space-y-3">
            <Link
              to="/add-property"
              className="block bg-blue-600 text-white text-center py-3 rounded-xl font-bold hover:bg-blue-700 transition"
            >
              Add Property
            </Link>

            <Link
              to="/my-listings"
              className="block bg-slate-950 text-white text-center py-3 rounded-xl font-bold hover:bg-slate-800 transition"
            >
              Manage Listings
            </Link>

            <Link
              to="/profile"
              className="block border border-slate-300 text-slate-800 text-center py-3 rounded-xl font-bold hover:bg-slate-100 transition"
            >
              Update Profile
            </Link>

            <Link
              to="/"
              className="block border border-slate-300 text-slate-800 text-center py-3 rounded-xl font-bold hover:bg-slate-100 transition"
            >
              View Public Feed
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default Dashboard;


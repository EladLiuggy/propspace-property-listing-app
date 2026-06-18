import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import PropertyCard from "../components/PropertyCard";
import FilterSidebar from "../components/FilterSidebar";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import AlertMessage from "../components/AlertMessage";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const params = {};

        const cleanCity = appliedFilters.city.trim();
        const cleanMinPrice = appliedFilters.minPrice.toString().trim();
        const cleanMaxPrice = appliedFilters.maxPrice.toString().trim();

        if (cleanCity) params.city = cleanCity;
        if (cleanMinPrice) params.minPrice = cleanMinPrice;
        if (cleanMaxPrice) params.maxPrice = cleanMaxPrice;

        const response = await api.get("/properties", {
          params,
          signal: controller.signal,
        });

        setProperties(response.data.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError(
            err.response?.data?.message ||
              "Unable to load properties. Please try again."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();

    return () => {
      controller.abort();
    };
  }, [appliedFilters]);

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();

    setAppliedFilters({
      city: filters.city.trim(),
      minPrice: filters.minPrice.toString().trim(),
      maxPrice: filters.maxPrice.toString().trim(),
    });
  };

  const handleResetFilters = () => {
    const emptyFilters = {
      city: "",
      minPrice: "",
      maxPrice: "",
    };

    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      <section className="relative mx-4 md:mx-8 mt-8 overflow-hidden rounded-3xl">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          alt="Modern luxury home"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/30" />

        <div className="relative px-8 py-16 md:px-14 md:py-24 text-white">
          <span className="inline-block rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-100 border border-blue-300/30 mb-5">
            Trusted Property Marketplace
          </span>

          <h1 className="max-w-3xl text-4xl md:text-6xl font-extrabold leading-tight mb-5">
            Find a comfortable property that fits your lifestyle.
          </h1>

          <p className="max-w-2xl text-lg text-slate-200 mb-8">
            Explore apartments, houses, and studios for rent or sale. Filter by
            city and price to quickly find the right space.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#properties"
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700 transition"
            >
              Browse Properties
            </a>

            <Link
              to="/add-property"
              className="rounded-xl bg-white/10 px-6 py-3 font-bold text-white border border-white/30 hover:bg-white/20 transition"
            >
              List a Property
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-3xl">
            <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-4">
              <p className="text-3xl font-extrabold">{properties.length}+</p>
              <p className="text-sm text-slate-200">Available listings</p>
            </div>

            <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-4">
              <p className="text-3xl font-extrabold">3</p>
              <p className="text-sm text-slate-200">Property types</p>
            </div>

            <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-4">
              <p className="text-3xl font-extrabold">24/7</p>
              <p className="text-sm text-slate-200">Online access</p>
            </div>
          </div>
        </div>
      </section>

      <section id="properties" className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <FilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              onSubmit={handleFilterSubmit}
              onReset={handleResetFilters}
            />
          </aside>

          <section className="lg:col-span-3">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-950">
                  Available Properties
                </h2>
                <p className="text-slate-600 mt-1">
                  Search through verified property listings.
                </p>
              </div>

              <p className="text-slate-600 font-semibold">
                {properties.length} result(s)
              </p>
            </div>

            <AlertMessage message={error} />

            {loading ? (
              <LoadingSpinner text="Loading properties..." />
            ) : properties.length === 0 ? (
              <EmptyState message="No properties match your search filters." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((property, index) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                    index={index}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
};

export default Home;


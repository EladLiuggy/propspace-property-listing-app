import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="bg-slate-50 min-h-screen flex items-center justify-center px-6">
      <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-10 max-w-xl text-center">
        <p className="text-blue-700 font-semibold mb-3">404 Error</p>

        <h1 className="text-4xl font-extrabold text-slate-950 mb-4">
          Page Not Found
        </h1>

        <p className="text-slate-600 mb-8">
          The page you are looking for does not exist or may have been moved.
          Return to the property feed and continue browsing listings.
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;


import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-slate-950 text-white px-6 md:px-8 py-5 flex items-center justify-between shadow-sm">
      <Link to="/" className="text-3xl font-extrabold tracking-tight">
        PropSpace
      </Link>

      <div className="flex gap-5 items-center text-lg">
        <NavLink to="/" className="hover:text-blue-300 transition">
          Home
        </NavLink>

        {user ? (
          <>
            <NavLink to="/dashboard" className="hover:text-blue-300 transition">
              Dashboard
            </NavLink>

            <NavLink to="/my-listings" className="hover:text-blue-300 transition">
              My Listings
            </NavLink>

            <NavLink to="/add-property" className="hover:text-blue-300 transition">
              Add Property
            </NavLink>

            <NavLink to="/profile" className="hover:text-blue-300 transition">
              Profile
            </NavLink>

            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="hover:text-blue-300 transition">
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

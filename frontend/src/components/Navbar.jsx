import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold">
        PropSpace
      </Link>

      <div className="flex gap-4 items-center">
        <NavLink to="/" className="hover:text-blue-300">
          Home
        </NavLink>

        {user ? (
          <>
            <NavLink to="/dashboard" className="hover:text-blue-300">
              Dashboard
            </NavLink>
            <NavLink to="/my-listings" className="hover:text-blue-300">
              My Listings
            </NavLink>
            <NavLink to="/profile" className="hover:text-blue-300">
              Profile
            </NavLink>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="hover:text-blue-300">
              Login
            </NavLink>
            <NavLink to="/register" className="bg-blue-600 px-3 py-1 rounded">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinkClass = "hover:text-blue-300 transition";

  return (
    <nav className="bg-slate-950 text-white px-6 md:px-8 py-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-3xl font-extrabold tracking-tight"
        >
          PropSpace
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden border border-slate-700 px-3 py-2 rounded-lg"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <div className="hidden md:flex gap-5 items-center text-lg">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          {user ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>

              <NavLink to="/my-listings" className={navLinkClass}>
                My Listings
              </NavLink>

              <NavLink to="/add-property" className={navLinkClass}>
                Add Property
              </NavLink>

              <NavLink to="/profile" className={navLinkClass}>
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
              <NavLink to="/login" className={navLinkClass}>
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
      </div>

      {menuOpen && (
        <div className="md:hidden mt-5 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <NavLink onClick={closeMenu} to="/" className="block">
            Home
          </NavLink>

          {user ? (
            <>
              <NavLink onClick={closeMenu} to="/dashboard" className="block">
                Dashboard
              </NavLink>

              <NavLink onClick={closeMenu} to="/my-listings" className="block">
                My Listings
              </NavLink>

              <NavLink onClick={closeMenu} to="/add-property" className="block">
                Add Property
              </NavLink>

              <NavLink onClick={closeMenu} to="/profile" className="block">
                Profile
              </NavLink>

              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="w-full bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink onClick={closeMenu} to="/login" className="block">
                Login
              </NavLink>

              <NavLink
                onClick={closeMenu}
                to="/register"
                className="block bg-blue-600 px-4 py-2 rounded-lg text-center"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

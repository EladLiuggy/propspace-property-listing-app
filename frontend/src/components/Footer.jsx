import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white mt-10">
      <div className="px-6 md:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-extrabold mb-3">PropSpace</h2>
          <p className="text-slate-300 max-w-xl leading-7">
            PropSpace is a property listing platform that helps users browse,
            create, manage, and update property listings with secure account
            access and a clean public property feed.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Quick Links</h3>
          <div className="space-y-2 text-slate-300">
            <Link to="/" className="block hover:text-blue-300">
              Home
            </Link>
            <Link to="/dashboard" className="block hover:text-blue-300">
              Dashboard
            </Link>
            <Link to="/my-listings" className="block hover:text-blue-300">
              My Listings
            </Link>
            <Link to="/add-property" className="block hover:text-blue-300">
              Add Property
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Features</h3>
          <div className="space-y-2 text-slate-300">
            <p>Public property feed</p>
            <p>Search and price filters</p>
            <p>Protected dashboard</p>
            <p>Profile management</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 px-6 md:px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-slate-400 text-sm">
        <p>© 2026 PropSpace. All rights reserved.</p>
        <p>Built with React, Express, Node.js, and MongoDB.</p>
      </div>
    </footer>
  );
};

export default Footer;


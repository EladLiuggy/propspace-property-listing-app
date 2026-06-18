import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";
import AlertMessage from "../components/AlertMessage";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
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

    if (!formData.username || !formData.email || !formData.password) {
      setError("Username, email, and password are required.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register", formData);

      const user = response.data.data.user;
      const token = response.data.data.token;

      login(user, token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
        <p className="text-slate-600 mb-6">
          Join PropSpace and start listing your properties.
        </p>

        <AlertMessage message={error} />

        <form onSubmit={handleSubmit}>
          <InputField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username"
            required
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;


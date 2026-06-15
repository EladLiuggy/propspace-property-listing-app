import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";
import AlertMessage from "../components/AlertMessage";
import LoadingSpinner from "../components/LoadingSpinner";

const fallbackAvatar =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80";

const Profile = () => {
  const { updateUser } = useAuth();

  const [profileData, setProfileData] = useState({
    profileName: "",
    phone: "",
    avatarUrl: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const response = await api.get("/users/profile");
        const user = response.data.data;

        setProfileData({
          profileName: user.profileName || "",
          phone: user.phone || "",
          avatarUrl: user.avatarUrl || "",
        });
      } catch (err) {
        setProfileError(
          err.response?.data?.message ||
            "Unable to load profile. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handlePasswordChange = (event) => {
    setPasswordData({
      ...passwordData,
      [event.target.name]: event.target.value,
    });
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    setProfileError("");
    setProfileSuccess("");

    try {
      setProfileLoading(true);

      const payload = {
        profileName: profileData.profileName.trim(),
        phone: profileData.phone.trim(),
        avatarUrl: profileData.avatarUrl.trim(),
      };

      const response = await api.put("/users/profile", payload);

      updateUser(response.data.data);
      setProfileSuccess("Profile updated successfully.");
    } catch (err) {
      setProfileError(
        err.response?.data?.message ||
          "Unable to update profile. Please try again."
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    setPasswordError("");
    setPasswordSuccess("");

    if (!passwordData.oldPassword || !passwordData.newPassword) {
      setPasswordError("Old password and new password are required.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }

    try {
      setPasswordLoading(true);

      await api.put("/users/password", passwordData);

      setPasswordData({
        oldPassword: "",
        newPassword: "",
      });

      setPasswordSuccess("Password updated successfully.");
    } catch (err) {
      setPasswordError(
        err.response?.data?.message ||
          "Unable to update password. Please try again."
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading profile settings..." />;
  }

  const previewAvatar = profileData.avatarUrl.trim() || fallbackAvatar;

  return (
    <main className="bg-slate-50 min-h-screen p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <p className="text-blue-700 font-semibold mb-2">Account Settings</p>
          <h1 className="text-4xl font-extrabold text-slate-950">
            Profile Settings
          </h1>
          <p className="text-slate-600 mt-2">
            Update your public profile details and change your account password.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-fit">
            <p className="text-sm font-semibold text-slate-600 mb-3">
              Avatar Preview
            </p>

            <img
              src={previewAvatar}
              alt="Profile avatar"
              onError={(event) => {
                event.currentTarget.src = fallbackAvatar;
              }}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow mx-auto mb-4"
            />

            <h2 className="text-center text-xl font-bold text-slate-950">
              {profileData.profileName || "PropSpace User"}
            </h2>

            <p className="text-center text-slate-500 mt-1">
              {profileData.phone || "No phone number added"}
            </p>
          </aside>

          <section className="lg:col-span-2 space-y-8">
            <form
              onSubmit={handleProfileSubmit}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
            >
              <h2 className="text-2xl font-bold text-slate-950 mb-2">
                Public Profile
              </h2>
              <p className="text-slate-600 mb-5">
                These details help users identify property owners.
              </p>

              <AlertMessage type="success" message={profileSuccess} />
              <AlertMessage message={profileError} />

              <InputField
                label="Profile Name"
                name="profileName"
                value={profileData.profileName}
                onChange={handleProfileChange}
                placeholder="Example: Elad PropSpace Agent"
              />

              <InputField
                label="Phone Number"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                placeholder="Example: 689689238"
              />

              <InputField
                label="Avatar URL"
                name="avatarUrl"
                value={profileData.avatarUrl}
                onChange={handleProfileChange}
                placeholder="Paste a professional profile image URL"
              />

              <button
                type="submit"
                disabled={profileLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-blue-300 transition"
              >
                {profileLoading ? "Updating..." : "Update Profile"}
              </button>
            </form>

            <form
              onSubmit={handlePasswordSubmit}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
            >
              <h2 className="text-2xl font-bold text-slate-950 mb-2">
                Change Password
              </h2>
              <p className="text-slate-600 mb-5">
                Enter your old password before setting a new one.
              </p>

              <AlertMessage type="success" message={passwordSuccess} />
              <AlertMessage message={passwordError} />

              <InputField
                label="Old Password"
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
                required
              />

              <InputField
                label="New Password"
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                required
              />

              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full bg-slate-950 text-white py-3 rounded-xl font-bold hover:bg-slate-800 disabled:bg-slate-400 transition"
              >
                {passwordLoading ? "Updating..." : "Change Password"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Profile;

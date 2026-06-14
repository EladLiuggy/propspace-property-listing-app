const {
  findUserById,
  findUserByIdWithPassword,
} = require("../repositories/user.repository");

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const getUserProfile = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw createError("User not found", 404);
  }

  return user;
};

const updateUserProfile = async (userId, profileData) => {
  const user = await findUserById(userId);

  if (!user) {
    throw createError("User not found", 404);
  }

  const { profileName, phone, avatarUrl } = profileData;

  if (profileName !== undefined) {
    user.profileName = profileName;
  }

  if (phone !== undefined) {
    user.phone = phone;
  }

  if (avatarUrl !== undefined) {
    user.avatarUrl = avatarUrl;
  }

  const updatedUser = await user.save();

  return {
    id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    profileName: updatedUser.profileName,
    phone: updatedUser.phone,
    avatarUrl: updatedUser.avatarUrl,
  };
};

const changeUserPassword = async (userId, passwordData) => {
  const { oldPassword, newPassword } = passwordData;

  if (!oldPassword || !newPassword) {
    throw createError("Old password and new password are required", 400);
  }

  if (newPassword.length < 6) {
    throw createError("New password must be at least 6 characters", 400);
  }

  const user = await findUserByIdWithPassword(userId);

  if (!user) {
    throw createError("User not found", 404);
  }

  const oldPasswordMatches = await user.matchPassword(oldPassword);

  if (!oldPasswordMatches) {
    throw createError("Old password is incorrect", 400);
  }

  user.password = newPassword;
  await user.save();

  return {
    message: "Password updated successfully",
  };
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
};

const asyncHandler = require("../utils/asyncHandler");
const {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
} = require("../services/user.service");

const getProfile = asyncHandler(async (req, res) => {
  const user = await getUserProfile(req.user._id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await updateUserProfile(req.user._id, req.body);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: user,
  });
});

const updatePassword = asyncHandler(async (req, res) => {
  const result = await changeUserPassword(req.user._id, req.body);

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

module.exports = {
  getProfile,
  updateProfile,
  updatePassword,
};

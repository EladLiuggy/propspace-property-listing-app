const asyncHandler = require("../utils/asyncHandler");
const {
  registerUser,
  loginUser,
  getLoggedInUser,
} = require("../services/auth.service");

const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const getMe = asyncHandler(async (req, res) => {
  const user = await getLoggedInUser(req.user._id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

module.exports = {
  register,
  login,
  getMe,
};

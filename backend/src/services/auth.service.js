const generateToken = require("../utils/generateToken");
const {
  createUser,
  findUserByEmail,
  findUserByUsername,
  findUserByEmailWithPassword,
  findUserById,
} = require("../repositories/user.repository");

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const registerUser = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw createError("Username, email, and password are required", 400);
  }

  if (password.length < 6) {
    throw createError("Password must be at least 6 characters", 400);
  }

  const existingEmail = await findUserByEmail(email);
  if (existingEmail) {
    throw createError("Email is already registered", 400);
  }

  const existingUsername = await findUserByUsername(username);
  if (existingUsername) {
    throw createError("Username is already taken", 400);
  }

  const user = await createUser({
    username,
    email,
    password,
    profileName: username,
  });

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      profileName: user.profileName,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
    },
    token: generateToken(user._id),
  };
};

const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw createError("Email and password are required", 400);
  }

  const user = await findUserByEmailWithPassword(email);

  if (!user) {
    throw createError("Invalid email or password", 401);
  }

  const passwordMatches = await user.matchPassword(password);

  if (!passwordMatches) {
    throw createError("Invalid email or password", 401);
  }

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      profileName: user.profileName,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
    },
    token: generateToken(user._id),
  };
};

const getLoggedInUser = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw createError("User not found", 404);
  }

  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getLoggedInUser,
};

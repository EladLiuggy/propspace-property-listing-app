const User = require("../models/User");

const createUser = async (userData) => {
  return User.create(userData);
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const findUserByUsername = async (username) => {
  return User.findOne({ username });
};

const findUserByEmailWithPassword = async (email) => {
  return User.findOne({ email }).select("+password");
};

const findUserById = async (id) => {
  return User.findById(id).select("-password");
};

const findUserByIdWithPassword = async (id) => {
  return User.findById(id).select("+password");
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
  findUserByEmailWithPassword,
  findUserById,
  findUserByIdWithPassword,
};

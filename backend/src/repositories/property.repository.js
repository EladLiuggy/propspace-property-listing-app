const Property = require("../models/Property");

const createProperty = async (propertyData) => {
  return Property.create(propertyData);
};

const findAllProperties = async (filters = {}) => {
  return Property.find(filters)
    .populate("author", "username profileName phone avatarUrl")
    .sort({ createdAt: -1 });
};

const findPropertyById = async (id) => {
  return Property.findById(id).populate(
    "author",
    "username profileName phone avatarUrl"
  );
};

const findPropertiesByAuthor = async (authorId) => {
  return Property.find({ author: authorId }).sort({ createdAt: -1 });
};

const deletePropertyById = async (id) => {
  return Property.findByIdAndDelete(id);
};

module.exports = {
  createProperty,
  findAllProperties,
  findPropertyById,
  findPropertiesByAuthor,
  deletePropertyById,
};

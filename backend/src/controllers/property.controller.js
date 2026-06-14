const asyncHandler = require("../utils/asyncHandler");
const {
  addProperty,
  getPublicProperties,
  getPropertyDetails,
  getMyProperties,
  updateProperty,
  removeProperty,
} = require("../services/property.service");

const createProperty = asyncHandler(async (req, res) => {
  const property = await addProperty(req.body, req.user._id);

  res.status(201).json({
    success: true,
    message: "Property created successfully",
    data: property,
  });
});

const getProperties = asyncHandler(async (req, res) => {
  const properties = await getPublicProperties(req.query);

  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties,
  });
});

const getPropertyById = asyncHandler(async (req, res) => {
  const property = await getPropertyDetails(req.params.id);

  res.status(200).json({
    success: true,
    data: property,
  });
});

const getMyListings = asyncHandler(async (req, res) => {
  const properties = await getMyProperties(req.user._id);

  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties,
  });
});

const editProperty = asyncHandler(async (req, res) => {
  const property = await updateProperty(req.params.id, req.body, req.user._id);

  res.status(200).json({
    success: true,
    message: "Property updated successfully",
    data: property,
  });
});

const deleteProperty = asyncHandler(async (req, res) => {
  const result = await removeProperty(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

module.exports = {
  createProperty,
  getProperties,
  getPropertyById,
  getMyListings,
  editProperty,
  deleteProperty,
};

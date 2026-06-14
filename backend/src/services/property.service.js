const {
  createProperty,
  findAllProperties,
  findPropertyById,
  findPropertiesByAuthor,
  deletePropertyById,
} = require("../repositories/property.repository");

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const buildPropertyFilters = (query) => {
  const filters = {};

  if (query.city) {
    filters.city = { $regex: query.city, $options: "i" };
  }

  if (query.minPrice || query.maxPrice) {
    filters.price = {};

    if (query.minPrice) {
      const minPrice = Number(query.minPrice);

      if (Number.isNaN(minPrice)) {
        throw createError("Minimum price must be a valid number", 400);
      }

      filters.price.$gte = minPrice;
    }

    if (query.maxPrice) {
      const maxPrice = Number(query.maxPrice);

      if (Number.isNaN(maxPrice)) {
        throw createError("Maximum price must be a valid number", 400);
      }

      filters.price.$lte = maxPrice;
    }
  }

  return filters;
};

const validatePropertyPayload = (payload) => {
  const {
    title,
    description,
    price,
    city,
    country,
    propertyType,
  } = payload;

  if (!title || !description || price === undefined || !city || !country || !propertyType) {
    throw createError(
      "Title, description, price, city, country, and property type are required",
      400
    );
  }

  const validTypes = ["Apartment", "House", "Studio"];

  if (!validTypes.includes(propertyType)) {
    throw createError("Property type must be Apartment, House, or Studio", 400);
  }

  if (Number.isNaN(Number(price)) || Number(price) < 0) {
    throw createError("Price must be a valid positive number", 400);
  }
};

const addProperty = async (payload, authorId) => {
  validatePropertyPayload(payload);

  const property = await createProperty({
    title: payload.title,
    description: payload.description,
    price: Number(payload.price),
    city: payload.city,
    country: payload.country,
    propertyType: payload.propertyType,
    imageUrls: Array.isArray(payload.imageUrls) ? payload.imageUrls : [],
    author: authorId,
  });

  return property;
};

const getPublicProperties = async (query) => {
  const filters = buildPropertyFilters(query);
  return findAllProperties(filters);
};

const getPropertyDetails = async (propertyId) => {
  const property = await findPropertyById(propertyId);

  if (!property) {
    throw createError("Property not found", 404);
  }

  return property;
};

const getMyProperties = async (authorId) => {
  return findPropertiesByAuthor(authorId);
};

const updateProperty = async (propertyId, payload, userId) => {
  const property = await findPropertyById(propertyId);

  if (!property) {
    throw createError("Property not found", 404);
  }

  if (property.author._id.toString() !== userId.toString()) {
    throw createError("You are not allowed to update this property", 403);
  }

  const allowedFields = [
    "title",
    "description",
    "price",
    "city",
    "country",
    "propertyType",
    "imageUrls",
  ];

  allowedFields.forEach((field) => {
    if (payload[field] !== undefined) {
      if (field === "price") {
        property[field] = Number(payload[field]);
      } else {
        property[field] = payload[field];
      }
    }
  });

  if (property.price < 0 || Number.isNaN(property.price)) {
    throw createError("Price must be a valid positive number", 400);
  }

  if (
    property.propertyType &&
    !["Apartment", "House", "Studio"].includes(property.propertyType)
  ) {
    throw createError("Property type must be Apartment, House, or Studio", 400);
  }

  return property.save();
};

const removeProperty = async (propertyId, userId) => {
  const property = await findPropertyById(propertyId);

  if (!property) {
    throw createError("Property not found", 404);
  }

  if (property.author._id.toString() !== userId.toString()) {
    throw createError("You are not allowed to delete this property", 403);
  }

  await deletePropertyById(propertyId);

  return {
    message: "Property deleted successfully",
  };
};

module.exports = {
  addProperty,
  getPublicProperties,
  getPropertyDetails,
  getMyProperties,
  updateProperty,
  removeProperty,
};

const express = require("express");
const {
  createProperty,
  getProperties,
  getPropertyById,
  getMyListings,
  editProperty,
  deleteProperty,
} = require("../controllers/property.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getProperties);
router.get("/my/listings", protect, getMyListings);
router.post("/", protect, createProperty);
router.get("/:id", getPropertyById);
router.put("/:id", protect, editProperty);
router.delete("/:id", protect, deleteProperty);

module.exports = router;

const express = require("express")

const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  getMyItems,
} = require("../controllers/itemController")

const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

// Create item
router.post("/", protect, createItem)

// Get all items
router.get("/", getItems)

// Get logged-in user items
router.get("/myposts", protect, getMyItems)

// Get single item
router.get("/:id", getItemById)

// Update item
router.put("/:id", protect, updateItem)

// Delete item
router.delete("/:id", protect, deleteItem)

module.exports = router
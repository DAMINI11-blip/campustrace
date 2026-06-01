const Item = require("../models/Item")

//
// CREATE ITEM
//
const createItem = async (req, res) => {
  try {
    console.log(req.user)
    const {
      title,
      category,
      description,
      location,
      contact,
      image,
      status,
    } = req.body

    // Validation
    if (
      !title ||
      !category ||
      !description ||
      !location
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      })
    }

    // Create item
    const item = await Item.create({
      title,
      category,
      description,
      location,
      contact,
      image,
      status,
      userId: req.user._id,
    })

    res.status(201).json(item)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

//
// GET ALL ITEMS
//
const getItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })

    res.json(items)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

//
// GET SINGLE ITEM
//
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate("userId", "name email")

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      })
    }

    res.json(item)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

//
// UPDATE ITEM
//
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      })
    }

    // Check ownership
    if (item.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      })
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(updatedItem)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

//
// DELETE ITEM
//
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      })
    }

    // Check ownership
    if (item.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      })
    }

    await item.deleteOne()

    res.json({
      message: "Item deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

//
// GET MY POSTS
//
const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 })

    res.json(items)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  getMyItems,
}
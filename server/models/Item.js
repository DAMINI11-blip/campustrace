const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["lost", "found", "recovered"],
      default: "lost",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Item", itemSchema)
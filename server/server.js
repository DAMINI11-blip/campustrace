const express = require("express")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const itemRoutes = require("./routes/itemRoutes")
const connectDB = require("./config/db")

// Connect Database
connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Test Route
app.get("/", (req, res) => {
  res.send("CampusTrace API Running")
})

app.use("/api/auth", authRoutes)
app.use("/api/items", itemRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
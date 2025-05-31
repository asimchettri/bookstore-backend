const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose");

// Middlewares
app.use(express.json())
app.use(cors({
    origin:['http://localhost:5173','https://bookstore-frontend-black.vercel.app'],
    credentials:true
}))

// Define routes BEFORE starting the server
app.get("/", (req, res) => {
    res.send("hola");
});

// API Routes
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require ('./src/orders/order.route')
const userRoutes = require ('./src/users/user.route')
const adminRoutes = require ('./src/stats/admin.stats')

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)

// Database connection
async function main() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.log("Database connection error:", err);
    }
}

// Connect to database
main();

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

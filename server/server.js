const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const users_route = require("./routes/users_route");
const app = express();

const mongoose = require("mongoose");
const connectDB = require("./config/connection");
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get("/test", (req, res) => {
  console.log("im here!");
  res.status(200).json({message:"hello there"})
});

// Routes
app.use("/users", users_route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

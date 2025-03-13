// core packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// custom routes
const bookRouter = require("./routes/books");
const authRouter = require("./routes/auth");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static folder for assets
app.use("/public", express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res) => {
  res.status(200).json("server is listening");
});

app.use("/book", bookRouter);
app.use(authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Rpute npt fpumd" });
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    app.listen(process.env.PORT);
    console.log("connection successful");
    console.log("Server is running on port", process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection to the database failed!");
  });

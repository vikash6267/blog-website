const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const port = process.env.PORT || 8080;

const awsConfig = require("./config/awsConfig");

const mongoose = require("mongoose");

if (process.env.DATABASE === "MONGODBATLAS") {
  mongoose.connect(process.env.DATABASEURL);
  mongoose.connection.on("error", (err) => {
    console.log("Connection Failed");
  });
  mongoose.connection.on("connected", (connected) => {
    console.log("Connected to MongoDB Atlas.");
  });
} else {
  console.log("No proper ENV.");
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



let allowedOrigins = [
  "http://localhost:8080",
];

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);

app.use(cors());

const blogRoute = require("./routes/blogRoute");

app.use("/", blogRoute);

app.listen(port);

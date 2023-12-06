require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const users = require("./routes/users");
const posts = require("./routes/posts");
const tags = require("./routes/tags");
const replies = require("./routes/replies");
const app = express();

//let mongoDBURL = process.env.mongoDBURL;

mongoose
  .connect(
    "mongodb+srv://Uniforum_JvS:qQrcsJdeKvvpFnsl@uniforumcluster0.kmrbvp8.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("could not connect to mongoDB"));

app.get("/", (req, res) => {
  res.send("request successfully sent!");
});

app.use(
  cors({
    origin: ["https://uniforum.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", users);
app.use("/posts", posts);
app.use("/tags", tags);
app.use("/reply", replies);

const port = 5000;
//process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

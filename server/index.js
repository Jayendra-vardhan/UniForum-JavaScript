require("dotenv").config();
const express = require("express");
const connectDB = require('./database');
const jwt = require("jsonwebtoken");
const config = require("config");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const users = require("./routes/users");
const posts = require("./routes/posts");
const tags = require("./routes/tags");
const replies = require("./routes/replies");

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
                origin: [
                  "https://uniforum-master-client.vercel.app",
                  "client:3000"
                ],
                methods: ["POST", "GET", "PUT","DELETE","UPDATE"],
                credentials: true,
              })
);


app.get("/", (req, res) => {
  res.send("request successfully sent!");
});

app.use("/users", users);
app.use("/posts", posts);
app.use("/tags", tags);
app.use("/reply", replies);

const port = 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

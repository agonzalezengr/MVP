const express = require("express");
const query = require("./database/query");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var cors = require("cors");
app.use(cors());

//routes
app.post("/user", (req, res) => {
  console.log("backend!");
  query.Signup(req, res);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

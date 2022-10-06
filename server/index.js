const express = require("express");
const path = require('path');
const query = require("./database/query");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

var cors = require("cors");
app.use(cors());

//routes
app.post("/user", (req, res) => {
  console.log('backside!');
  query.Signup(req, res);
});

app.post("/login", (req, res) => {
  query.Login(req, res);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

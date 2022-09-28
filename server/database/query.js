const pool = require("./index");

module.exports = {
  Signup: (req, res) => {
    var values = [req.body.name, req.body.email, req.body.password];
    const query = {
      text: `INSERT INTO users(name, email, password)
      Values ($1, $2, $3)
      Returning *;`,
      values: values,
    };
    pool
      .query(query)
      .then((result) => {
        res.status(201).send(result.data);
      })
      .catch((err) => {
        console.log("err: ", err);
        res.status(400).send(err);
      });
  },

  Login: (req, res) => {
    var values = [req.body.email, req.body.password];
    const query = {
      text: `SELECT * FROM users
      WHERE (email = $1 AND password = $2);`,
      values: values,
    };
    pool
      .query(query)
      .then((result) => {
        if (result.rows.length === 0) {
          return res.status(400).send("Account not found");
        }
        res.status(201).send(result);
      })
      .catch((err) => {
        console.log("login fail!");
        console.log("err: ", err);
        res.status(400).send(err);
      });
  },
};

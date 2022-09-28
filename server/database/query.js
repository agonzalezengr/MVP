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
};

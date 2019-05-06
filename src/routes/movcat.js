const route = require("express").Router();
const connect = require("../connection/dbconn");

// ADD MOVIE & CATEGORY
route.post("/movcat", (req, res) => {
  let query1 = `INSERT INTO movcat SET ?;`;
  let query2 = `SELECT movcat.id, m.nama as movie_name, c.nama as category_name FROM movies m
                JOIN movcat ON m.id = movcat.movie_id
                JOIN categories c ON c.id = movcat.category_id;`;
  let data = req.body;

  connect.query(query1, data, (err, result) => {
    if (err) return res.send(err.sqlMessage);

    connect.query(query2, (err, result) => {
      if (err) return res.send(err.message);

      res.send(result);
    });
  });
});

route.delete("/movcat/:movcatid", (req, res) => {
  let query1 = `DELETE FROM movcat WHERE id = ?;`;
  let id = req.params.movcatid;

  connect.query(query1, id, (err, result) => {
    if (err) return res.send(err.sqlMessage);

    res.send(result);
  });
});

module.exports = route;

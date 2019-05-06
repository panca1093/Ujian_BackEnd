const route = require("express").Router();
const connect = require("../connection/dbconn");

//ADD MOVIE
route.post("/addmovie", (req, res) => {
  let query1 = `INSERT INTO movies SET ?;`;
  let query2 = `SELECT * FROM movies;`;
  let data = req.body;

  connect.query(query1, data, (err, result) => {
    if (err) return res.send(err.sqlMessage);

    connect.query(query2, (err, result) => {
      if (err) return res.send(err);

      res.send(result);
    });
  });
});

// EDIT MOVIE
route.patch("/editmovie/:movieid", (req, res) => {
  let query1 = `UPDATE movies SET ? WHERE id = ?;`;
  let query2 = `SELECT * FROM movies WHERE id = ?;`;
  let data = [req.body, req.params.movieid];
  let id = req.params.movieid;

  connect.query(query1, data, (err, result) => {
    if (err) return res.send(err.sqlMessage);

    var resultq1 = result;

    connect.query(query2, id, (err, result2) => {
      if (err) return res.send(err.message);

      res.send({ resultq1, result2 });
    });
  });
});

// DELETE MOVIE
route.delete("/deletemovie/:movieid", (req, res) => {
  let query1 = `DELETE FROM movies WHERE id = ?;`;
  let query2 = `SELECT * FROM movies;`;
  let id = req.params.movieid;

  connect.query(query1, id, (err, result) => {
    if (err) return res.send(err.sqlMessage);

    var resultq1 = result;

    connect.query(query2, (err, result2) => {
      if (err) return res.send(err.message);

      res.send({ resultq1, result2 });
    });
  });
});

// SHOW MOVIES
route.get("/movie", (req, res) => {
  let query1 = `SELECT * FROM movies;`;

  connect.query(query1, (err, result) => {
    if (err) return res.send(err.sqlMessage);

    res.send(result);
  });
});

module.exports = route;

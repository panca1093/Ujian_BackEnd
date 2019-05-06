const mysql = require("mysql");

const connect = mysql.createConnection({
  user: "devuser",
  password: "barCODE10",
  host: "localhost",
  database: "ujianbackend",
  port: "3306"
});

connect.connect((err, result) => {
  if (err) return console.log("can't connet!");

  console.log("connected");
});

module.exports = connect;

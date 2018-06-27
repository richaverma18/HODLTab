var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "hodldb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE if not exists coins (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, name VARCHAR(255), market_cap_id INT NOT NULL, UNIQUE(market_cap_id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

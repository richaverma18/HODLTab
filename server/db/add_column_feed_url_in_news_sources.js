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
  var sql = "ALTER TABLE news_sources ADD COLUMN feed_url VARCHAR(255)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("column added");
  });
});

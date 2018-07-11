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
  var sql = "CREATE TABLE if not exists user_feed_sources ( user_id INT NOT NULL, news_source_id INT NOT NULL, PRIMARY KEY(user_id, news_source_id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");

  });
});

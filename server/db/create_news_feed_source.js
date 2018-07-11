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
  var sql = "CREATE TABLE if not exists news_sources (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, name VARCHAR(255), category VARCHAR(255), logo VARCHAR(255), url VARCHAR(255), description TEXT, traffic VARCHAR(255), type VARCHAR(255), posts VARCHAR(255), UNIQUE(name,category) )";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const feedFormatter =  require('./FeedFormatter');
const parser = require('xml2js');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.set("port", process.env.PORT || 3001);
// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../build"));
}

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "hodltab.auth0.com/.well-known/jwks.json"
    }),
});

const COIN_DESK_FEED_API = 'https://www.coindesk.com/feed/';
const COIN_TELEGRAPH_FEED_API = 'https://cointelegraph.com/rss';


app.get('/api/news_feed', (req, res) => {
  axios.all([
    axios.get(COIN_DESK_FEED_API, {headers: {
      'Content-Type': 'application/xml',
    }}),
    axios.get(COIN_TELEGRAPH_FEED_API, {headers: {
      'Content-Type': 'application/xml',
    }})])
   .then(([coinDeskResponse, coinTelegraphResponse]) => {
     var parseString = parser.parseString;
     var coinDeskFeed = [];
     var coinTelegraphFeed = [];
     parseString(coinDeskResponse.data, function (err, result) {
       coinDeskFeed = feedFormatter.formatCoinDeskFeed(result.rss.channel[0]);
     });
     parseString(coinTelegraphResponse.data, function (err, result) {
       coinTelegraphFeed = feedFormatter.formatCoinTelegraphFeed(result.rss.channel[0]);
     });
     res.json(feedFormatter.shuffle(coinDeskFeed.concat(coinTelegraphFeed)));
   });
})

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "hodldb"
});
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// }

app.get('/api/user_profile', (req, res) =>{
// console.log("reaching here");
    let email = req.query.email;
    // console.log("user email");
    // console.log(email);
    var sql = "SELECT * from users WHERE email = '" + email + "'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      // console.log("user from sql");
      if(result.length > 0){
        // console.log(result[0]);
        let user_coins_query = "select * from user_coins where user_id = " + result[0].id ;
        con.query(user_coins_query, function(err, user_coins){
          if (err) throw err;
          // console.log(user_coins.map(coin => coin.coin_id));
          result[0]['coins'] = user_coins.map(coin => coin.coin_id);
          // console.log(result[0]);
          res.json(result[0]);
        })
      }else{
        res.json(result);
      }
    });
  });


// app.post('/api/add_coins', (req,res) => {
//   con.connect(function(err){
//     if (err) throw err;
//     console.log("adding coins");
//   });
// })

app.post('/api/create_user', (req,res) =>{
    // console.log("create user!");
    let email = req.body.email;
    // console.log(email);
    var sql = 'insert into users(name,email) values(\'' + req.body.name + '\',\'' + req.body.email+'\')';
    con.query(sql, function (err, result) {
      if (err) throw err;
      // console.log(" created user in sql");
      // console.log(result);
      res.json(result);
    });
  });

  // { user_id: 3,
  //   coins:
  //    [ { id: 1, name: 'Bitcoin', symbol: 'BTC', website_slug: 'bitcoin' } ] }

function getCoin(coin_id){
  return new Promise(function(resolve, reject){
    let coin_query = 'select * from coins where market_cap_id=' + coin_id;
    con.query(coin_query, function(err, result){
      // if(err) return reject(err);
          if(err) throw err;
          // console.log("coins ----- ");
          // console.log(result);
          resolve(result);
    });
  })
}

function add_user_coin(coin_id, user_id){
    let add_user_coin_query = 'insert into user_coins(user_id, coin_id) values('+ user_id+ ',' + coin_id+ ')';
    con.query(add_user_coin_query, function (err, result) {
    if (err) throw err;
    // console.log(" created user coin in sql");
    // console.log(result.insertID);
  });
}




app.post('/api/add_coins', (req,res) => {
  // console.log("added coins");
  // console.log(req.body);
  req.body.coins.map(coin => {
    getCoin(coin.id).then(coinDB => {
      // console.log(coinDB);
      if(coinDB.length > 0){
          add_user_coin(coinDB[0].id, req.body.user_id);
      }else{
        let add_coin_query = 'insert into coins(name,market_cap_id) values(\'' +  coin.name + '\',\'' + coin.id + '\')';
        con.query(add_coin_query, function (err, result) {
          if (err) throw err;
          // console.log(" created coin in sql");
          // console.log(result.insertId);
          add_user_coin(result.insertId, req.body.user_id);
      });
    }
    });
});
})

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

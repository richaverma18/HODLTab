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

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

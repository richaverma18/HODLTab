import {formatCoinDeskFeed, formatCoinTelegraphFeed} from './FeedFormatter.js';
import axios from 'axios';
import parser from 'xml2js';

const COIN_DESK_FEED_API = 'https://www.coindesk.com/feed/';
const COIN_TELEGRAPH_FEED_API = 'https://cointelegraph.com/rss';

function getCoinDeskFeed(){
  const config = {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials: 'same-origin',
    };
   return axios.all([
     axios.get(COIN_DESK_FEED_API),
     axios.get(COIN_TELEGRAPH_FEED_API)])
    .then(([coinDeskResponse, coinTelegraphResponse]) => {
      var parseString = parser.parseString;
      var coinDeskFeed = [];
      var coinTelegraphFeed = [];
      parseString(coinDeskResponse.data, function (err, result) {
        coinDeskFeed = formatCoinDeskFeed(result.rss.channel[0]);
      });
      parseString(coinTelegraphResponse.data, function (err, result) {
        coinTelegraphFeed = formatCoinTelegraphFeed(result.rss.channel[0]);
      });
      return shuffle(coinDeskFeed.concat(coinTelegraphFeed));
    });
}

function shuffle(arr) {
    let ctr = arr.length;
    let temp;
    let index;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

export {getCoinDeskFeed};

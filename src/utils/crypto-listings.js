import CoinMarketCap from 'coinmarketcap-api';
import axios from 'axios';

function getCryptoListings(){
  // var listings = [];
  return axios.get("https://api.coinmarketcap.com/v2/listings/").then(response => response.data);
  // return listings;
}

export {getCryptoListings};

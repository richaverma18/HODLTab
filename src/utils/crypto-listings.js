import axios from 'axios';

function getCryptoListings(){
  // var listings = [];
  // var id = 1;
  // console.log("https://api.coinmarketcap.com/v2/global/" + id.toString() +"/");

  return axios.get("https://api.coinmarketcap.com/v2/listings/").then(response => response.data);
  // return listings;
}

function getGlobalData(){
  return axios.get("https://api.coinmarketcap.com/v2/global/").then(response => response.data);
}

function getTickerData(id){
  let ticker_url = 'https://api.coinmarketcap.com/v2/ticker/';
  if(id){
    return axios.get(ticker_url + id.toString() + "/?structure=array").then(response => response.data);
  }else{
    return axios.get(ticker_url + "/?structure=array").then(response => response.data);
  }
}

export {getCryptoListings, getGlobalData, getTickerData};

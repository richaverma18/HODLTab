import axios from 'axios';

const BASE_URL = 'http://localhost:3333';

function getCoinDeskFeed(){
  const url = `${BASE_URL}/api/news_feed`;
  return axios.get(url).then(response => response.data);
}

export {getCoinDeskFeed};

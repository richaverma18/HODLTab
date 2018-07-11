import axios from 'axios';

//const BASE_URL = 'http://localhost:3333';

function getCoinDeskFeed(){
  const url = `/api/news_feed`;
  return axios.get(url).then(response => response.data);
}

function getNewsFeedSources(){
  const url = '/api/sources';
  return axios.get(url).then(response => response.data);
}

function getAddedSources(user_id){
  const url = '/api/added_sources';
  return axios.get(url, {
  params: {
    id: user_id
  }
  }).then(response => response.data);
}

export {getCoinDeskFeed, getNewsFeedSources, getAddedSources};

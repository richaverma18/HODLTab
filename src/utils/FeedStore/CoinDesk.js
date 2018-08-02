import axios from 'axios';

//const BASE_URL = 'http://localhost:3333';

function getCoinDeskFeed(){
  const url = `/api/news_feed`;
  return axios.get(url).then(response => response.data);
}

function getRedditFeeds(){
  return axios.get('/api/reddit_feeds').then(response => response.data);
}

function getFeeds(){
  return axios.all([
    axios.get(`/api/news_feed`),
    axios.get('/api/reddit_feeds')])
   .then(([newsFeed, redditFeed]) => {
      console.log(newsFeed.data);
      console.log(redditFeed.data);
      return newsFeed.data.concat(redditFeed.data);
   });
}

function getFeedForSources(source_ids){
  return axios.get('/api/feeds', {
    params: {
      source_ids: source_ids
    }
  }).then(response => response.data);
}

function getSourceInfo(ids){
  return axios.get('/api/get_source_info', {
    params: {
      ids: ids
    }
  }).then(response => response.data);
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

export {getCoinDeskFeed, getNewsFeedSources, getAddedSources, getRedditFeeds, getFeeds, getFeedForSources, getSourceInfo};

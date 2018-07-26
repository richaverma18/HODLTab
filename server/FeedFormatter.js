const VALID_TAGS = ['XRP','Bitcoin','EOS','Ethereum', 'Ethereum Classic','BitGo','Abra',"Altcoin", "ICO","Blockchain", "R3","Corda","Ripple","Bitcoin Cash","Litecoin","Cardano", "CryptoCurrency"];

 module.exports.formatYouTubeFeed = function(data){

  var youTubeFeed = [];
  let items = data.items;
  for(let i=0; i< items.length; i++){
    let feedItem={tags:[]};
    feedItem['description'] = getViews(items[i]['media:group']);
    feedItem['link'] = items[i].link;
    feedItem['pubDate'] = items[i].pubDate;
    feedItem['title'] = items[i].title;
    feedItem['siteName'] = data.title;
    feedItem['siteLogo'] = data.image ? data.image.url : '';
    feedItem['video'] = items[i]['yt:videoId'];
    youTubeFeed.push(feedItem);
  }
  return youTubeFeed;
};

getViews = function(data){
  var views = '';
  if(data && data['media:community'] && data['media:community'][0] && data['media:community'][0]['media:statistics'] && data['media:community'][0]['media:statistics'][0] && data['media:community'][0]['media:statistics'][0]['$']['views']){
    views = formatToUnits(data['media:community'][0]['media:statistics'][0]['$']['views']).toString() + ' views';
  }
  return views;
}

formatToUnits = function(number) {
  const abbrev = ['', 'k', 'M', 'B', 'T'];
  const order = Math.min(Math.floor(Math.log10(Math.abs(number)) / 3), abbrev.length - 1);
  const suffix = abbrev[order];
  return (number / Math.pow(10, order * 3)).toFixed(0) + suffix;
}

module.exports.formatCoinTelegraphFeed = function(data){
  var coinTelegraphFeed = [];
  let items = data.items;
  for(let i=0; i< items.length; i++){
    let feedItem={tags:[]};
    let category = items[i].categories ? items[i].categories : '';
    for(let j=0; j< category.length; j++){
      if(VALID_TAGS.includes(category[j])){
        feedItem.tags.push(category[j]);
      }
    }
    feedItem['image'] = parseImageForNews(items[i]);
    feedItem['description'] = items[i].contentSnippet;
    feedItem['link'] = items[i].link;
    feedItem['pubDate'] = items[i].pubDate;
    feedItem['title'] = items[i].title;
    feedItem['siteName'] = data.feedUrl.includes('cointelegraph') ? 'CoinTelegraph' : data.title;
    feedItem['siteLogo'] = data.image ? data.image.url : '';
    coinTelegraphFeed.push(feedItem);
  }
  return coinTelegraphFeed;
};

parseImageForNews = function(data){
  let image = (data['media:content'] && data['media:content']['$']) ? data['media:content']['$']['url'] : '';
  if(image === '' && data.content && data.content.includes('<img')){
    image = data.content.split('src=\"')[1].split("\"")[0];
  }
  return image;
}

module.exports.formatRedditFeed = function(data){
  var redditFeed = [];

  for(let i=0; i< data.items.length; i++){
    let feedItem={};
    feedItem['tags'] = [data.items[i].category['$']['term']];

    const content = data.items[i].content;
    if(content.includes('<img')){
      feedItem['image'] = content.split('<img src=\"')[1].split("\"")[0];
    }

    feedItem['description'] = '';
    feedItem['link'] = data.items[i].link;
    feedItem['pubDate'] = data.items[i].pubDate;
    feedItem['title'] = data.items[i].title;
    feedItem['siteName'] = data.items[i].category['$']['label'];
    feedItem['siteLogo'] = data.icon.substring(0, data.icon.toString().length - 1);
    redditFeed.push(feedItem);
  }
  return redditFeed;
}

module.exports.shuffle = function(arr) {
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
};
// export {formatCoinDeskFeed, formatCoinTelegraphFeed, shuffle};

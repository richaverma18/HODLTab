const VALID_TAGS = ['XRP','Bitcoin','EOS','Ethereum', 'Ethereum Classic','BitGo','Abra',"Altcoin", "ICO","Blockchain", "R3","Corda","Ripple","Bitcoin Cash","Litecoin","Cardano", "CryptoCurrency"];

 module.exports.formatCoinDeskFeed = function(data){

  var coinDeskFeed = [];
  // console.log(data);
  let items = data.items;
  for(let i=0; i< items.length; i++){
    let feedItem={tags:[]};
    let categories = items[i].category || items[i].categories;
    for(let j=0; j<categories.length; j++){
      if(VALID_TAGS.includes(categories[j])){
        feedItem.tags.push(categories[j]);
      }
    }
    feedItem['description'] = items[i].contentSnippet;
    feedItem['link'] = items[i].link;
    feedItem['pubDate'] = items[i].pubDate;
    feedItem['title'] = items[i].title;
    feedItem['siteName'] = data.title;
    feedItem['siteLogo'] = data.image.url;
    coinDeskFeed.push(feedItem);
  }
  return coinDeskFeed;
};

module.exports.formatCoinTelegraphFeed = function(data){
  // console.log("*********************");
  // console.log(data);
  // console.log("*********************");
  var coinTelegraphFeed = [];
  let items = data.items;
  for(let i=0; i< items.length; i++){
    let feedItem={tags:[]};
    let category = items[i].category || items[i].categories;
    for(let j=0; j< category.length; j++){
      if(VALID_TAGS.includes(category[j])){
        feedItem.tags.push(category[j]);
      }
    }
    feedItem['image'] = (items[i]['media:content'] && items[i]['media:content']['$']) ? items[i]['media:content']['$']['url'] : '';
    feedItem['description'] = items[i].contentSnippet;
    feedItem['link'] = items[i].link;
    feedItem['pubDate'] = items[i].pubDate;
    feedItem['title'] = items[i].title;
    feedItem['siteName'] = data.feedUrl.includes('cointelegraph') ? 'CoinTelegraph' : data.title;
    feedItem['siteLogo'] = data.image.url;
    coinTelegraphFeed.push(feedItem);
  }
  return coinTelegraphFeed;
};

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

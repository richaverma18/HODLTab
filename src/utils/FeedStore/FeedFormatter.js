const VALID_TAGS = ['XRP','Bitcoin','EOS','Ethereum', 'Ethereum Classic','BitGo','Abra',"Altcoin", "ICO","Blockchain", "R3","Corda","Ripple","Bitcoin Cash","Litecoin","Cardano"];

function formatCoinDeskFeed(data){

  var coinDeskFeed = [];

  for(let i=0; i< data.item.length; i++){
    let feedItem={tags:[]};

    for(let j=0; j<data.item[i].category.length; j++){
      if(VALID_TAGS.includes(data.item[i].category[j])){
        feedItem.tags.push(data.item[i].category[j]);
      }
    }
    feedItem['description'] = data.item[i].description[0];
    feedItem['link'] = data.item[i].link[0];
    feedItem['pubDate'] = data.item[i].pubDate[0];
    feedItem['title'] = data.item[i].title[0];
    feedItem['siteName'] = data.title[0];
    feedItem['siteLogo'] = data.image[0].url[0];
    coinDeskFeed.push(feedItem);
  }
  return coinDeskFeed;
}

function formatCoinTelegraphFeed(data){
  var coinTelegraphFeed = [];

  for(let i=0; i< data.item.length; i++){
    let feedItem={tags:[]};
    for(let j=0; j<data.item[i].category.length; j++){
      if(VALID_TAGS.includes(data.item[i].category[j])){

        feedItem.tags.push(data.item[i].category[j]);
      }
    }
    let desc = data.item[i].description[0].split("<img src=\"");
    if(desc[1]){
      let a = desc[1].split("<p>");
      // console.log(data.item[i].description[0].substring(data.item[i].description[0].indexOf("<img src=\""), data.item[i].description[0].indexOf("><p>")));
      feedItem['image'] = a[0].split("\"")[0];
      feedItem['description'] = a[1].split("<")[0];
    }
    else{
      feedItem['description'] = data.item[i].description[0];
    }
    feedItem['link'] = data.item[i].link[0];
    feedItem['pubDate'] = data.item[i].pubDate[0];
    feedItem['title'] = data.item[i].title[0];
    feedItem['siteName'] = 'CoinTelegraph';
    feedItem['siteLogo'] = data.image[0].url[0];
    coinTelegraphFeed.push(feedItem);
  }
  return coinTelegraphFeed;
}


export {formatCoinDeskFeed, formatCoinTelegraphFeed};

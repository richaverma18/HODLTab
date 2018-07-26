
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "hodldb"
});

var feedUrls = [{name: 'r/cryptocurrency',feed_url:'https://www.reddit.com/r/CryptoCurrency/.rss?format=xml'},{name: 'r/btc',feed_url:'https://www.reddit.com/r/btc/.rss?format=xml'},{name: 'r/bitcoin',feed_url:'https://www.reddit.com/r/Bitcoin/.rss?format=xml'},{name: 'r/bitcoinmarkets',feed_url:'https://www.reddit.com/r/bitcoinmarkets/.rss?format=xml'},{name: 'r/binanceexchange',feed_url:'https://www.reddit.com/r/binanceexchange/.rss?format=xml'},{name: 'r/ethereum',feed_url:'https://www.reddit.com/r/ethereum/.rss?format=xml'},{name: 'r/ripple', feed_url:'https://www.reddit.com/r/ripple/.rss?format=xml'},{name: 'r/bitcoincash',feed_url:'https://www.reddit.com/r/bitcoincash/.rss?format=xml'},{name: 'r/eos',feed_url:'https://www.reddit.com/r/eos/.rss?format=xml'},{name: 'r/litecoin',feed_url:'https://www.reddit.com/r/litecoin/.rss?format=xml'},{name: 'r/stellar',feed_url:'https://www.reddit.com/r/stellar/.rss?format=xml'},{name: 'r/cardano',feed_url:'https://www.reddit.com/r/cardano/.rss?format=xml'},{name: 'r/iota',feed_url:'https://www.reddit.com/r/iota/.rss?format=xml'},{name: 'r/neo',feed_url:'https://www.reddit.com/r/neo/.rss?format=xml'},{name: 'r/tronix',feed_url:'https://www.reddit.com/r/tronix/.rss?format=xml'},{name: 'r/monero',feed_url:'https://www.reddit.com/r/monero/.rss?format=xml'},{name: 'r/dashpay',feed_url:'https://www.reddit.com/r/dashpay/.rss?format=xml'},{name: 'r/ethereumclassic',feed_url:'https://www.reddit.com/r/ethereumclassic/.rss?format=xml'},{name: 'Coindesk',feed_url:'https://www.coindesk.com/feed/'},{name: 'Cointelegraph',feed_url:'https://cointelegraph.com/rss'},{name: 'NewsBTC',feed_url:'https://www.newsbtc.com/feed/'},{name: 'Coinbase Blog',feed_url:'https://medium.com/feed/the-coinbase-blog/'},{name: 'Bitcoinist',feed_url:'https://bitcoinist.com/feed/'},{name: 'Cryptodaily',feed_url:'https://cryptodaily.co.uk/feed/'},{name: 'BTCManager',feed_url:'https://btcmanager.com/feed/'},{name: 'AMB Crypto',feed_url:'https://ambcrypto.com/feed/'},{name: 'Invest in Blockchain',feed_url:'https://www.investinblockchain.com/feed/'},{name: 'Ethereum World News',feed_url:'https://ethereumworldnews.com/feed/'},{name: 'Cryptovest',feed_url:'https://cryptovest.com/feed'},{name: 'ETH News',feed_url:'https://www.ethnews.com/rss.xml'},{name: 'Crypto Briefing',feed_url:'https://cryptobriefing.com/feed/'}
];

var youtube = [{name: 'DataDash',feed_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UCCatR7nWbYrkVXdxXb4cGXw'},{name: 'Doug Polk Crypto',feed_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UC4sS8q8E5ayyghbhiPon4uw'},{name: 'Chris Dunn',feed_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UCdC3h2m88FC02Yw-A_VESRQ'},{name: 'Boxmining',feed_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UCxODjeUwZHk3p-7TU-IsDOA'},{name: 'Ivan on Tech',feed_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UCrYmtJBtLdtm2ov84ulV-yg'},{name: 'Suppoman',feed_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UCCmJln4C_CszIusbJ_MHmfQ'},{name: 'Coin Mastery',feed_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UC4nXWTjZqK4bv7feoRntSog'},{name: 'Crypt0',feed_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UCdUSSt-IEUg2eq46rD7lu_g'},{name: 'CryptoDaily',feed_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UC67AEEecqFEc92nVvcqKdhA'},{name: 'Crypto Coin News',feed_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UCkpt3vvZ0Y0wvTX2L-lkxsg'},{name: 'CryptoLark',feed_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UCl2oCaw8hdR_kbqyqd2klIA'},{name: 'They Call me Dan',feed_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UC0mGweSZMRmhBSpEjPFQByA'},{name: 'Cryptospark',feed_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UCRm86Q7VPZ7rYINKB-mCCUQ'},{name: 'Cryptotips',feed_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UCavTvSwEoRABvnPtLg0e6LQ'},{name: 'Crypto Oracle',feed_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UCEBRZGYDGPDUUDOJ9pX3tPg'},{name: 'The Right Trader',feed_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UCkpMhY4N4ZjpqKMIjzLplKw'},{name: 'The Chart Guys',feed_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UCnqZ2hx679DqRi6khRUNw2g'},{name: 'Sunny Decree',feed_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UCjXdoICJ4KXHuDIEFYfBgHw'}]


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  youtube.forEach(value => {
    var sql = "UPDATE news_sources SET feed_url='" + value.feed_url + "' where name='" + value.name + "'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("feed url added");
    });
  })

});

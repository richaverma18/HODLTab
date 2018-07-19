
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "hodldb"
});

var feedUrls = [{name: 'r/cryptocurrency',feed_url:'https://www.reddit.com/r/CryptoCurrency/.rss?format=xml'},{name: 'r/btc',feed_url:'https://www.reddit.com/r/btc/.rss?format=xml'},{name: 'r/bitcoin',feed_url:'https://www.reddit.com/r/Bitcoin/.rss?format=xml'},{name: 'r/bitcoinmarkets',feed_url:'https://www.reddit.com/r/bitcoinmarkets/.rss?format=xml'},{name: 'r/binanceexchange',feed_url:'https://www.reddit.com/r/binanceexchange/.rss?format=xml'},{name: 'r/ethereum',feed_url:'https://www.reddit.com/r/ethereum/.rss?format=xml'},{name: 'r/ripple', feed_url:'https://www.reddit.com/r/ripple/.rss?format=xml'},{name: 'r/bitcoincash',feed_url:'https://www.reddit.com/r/bitcoincash/.rss?format=xml'},{name: 'r/eos',feed_url:'https://www.reddit.com/r/eos/.rss?format=xml'},{name: 'r/litecoin',feed_url:'https://www.reddit.com/r/litecoin/.rss?format=xml'},{name: 'r/stellar',feed_url:'https://www.reddit.com/r/stellar/.rss?format=xml'},{name: 'r/cardano',feed_url:'https://www.reddit.com/r/cardano/.rss?format=xml'},{name: 'r/iota',feed_url:'https://www.reddit.com/r/iota/.rss?format=xml'},{name: 'r/neo',feed_url:'https://www.reddit.com/r/neo/.rss?format=xml'},{name: 'r/tronix',feed_url:'https://www.reddit.com/r/tronix/.rss?format=xml'},{name: 'r/monero',feed_url:'https://www.reddit.com/r/monero/.rss?format=xml'},{name: 'r/dashpay',feed_url:'https://www.reddit.com/r/dashpay/.rss?format=xml'},{name: 'r/ethereumclassic',feed_url:'https://www.reddit.com/r/ethereumclassic/.rss?format=xml'},{name: 'Coindesk',feed_url:'https://www.coindesk.com/feed/'},{name: 'Cointelegraph',feed_url:'https://cointelegraph.com/rss'},{name: 'NewsBTC',feed_url:'https://www.newsbtc.com/feed/'},{name: 'Coinbase Blog',feed_url:'https://medium.com/feed/the-coinbase-blog/'},{name: 'Bitcoinist',feed_url:'https://bitcoinist.com/feed/'},{name: 'Cryptodaily',feed_url:'https://cryptodaily.co.uk/feed/'},{name: 'BTCManager',feed_url:'https://btcmanager.com/feed/'},{name: 'AMB Crypto',feed_url:'https://ambcrypto.com/feed/'},{name: 'Invest in Blockchain',feed_url:'https://www.investinblockchain.com/feed/'},{name: 'Ethereum World News',feed_url:'https://ethereumworldnews.com/feed/'},{name: 'Cryptovest',feed_url:'https://cryptovest.com/feed'},{name: 'ETH News',feed_url:'https://www.ethnews.com/rss.xml'},{name: 'Crypto Briefing',feed_url:'https://cryptobriefing.com/feed/'}
];


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  feedUrls.forEach(value => {
    var sql = "UPDATE news_sources SET feed_url='" + value.feed_url + "' where name='" + value.name + "'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("feed url added");
    });
  })

});

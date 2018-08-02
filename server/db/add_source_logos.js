var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "hodldb"
});


var logos = [{name: 'Coindesk',logo: 'coindesk.png'},{name: 'Cointelegraph',logo: 'cointelegraph.jpg'},{name: 'NewsBTC',logo: 'newsbtc.jpeg'},{name: 'Coinbase Blog',logo: 'coinbase.png'},{name: 'Bitcoinist',logo: 'bitcoinist.jpg'},{name: 'Cryptodaily',logo: 'cryptodaily.jpeg'},{name: 'BTCManager',logo: 'btcmanager.png'},{name: 'AMB Crypto',logo: 'ambcrypto.png'},{name: 'Invest in Blockchain',logo: 'investinblockchain.png'},{name: 'Ethereum World News',logo: 'ethereumworldnews.png'},{name: 'Cryptovest',logo: 'cryptovest.jpeg'},{name: 'ETH News',logo: 'ethnews.jpg'},{name: 'Crypto Briefing',logo: 'cryptobriefing.jpg'},{name: 'r/cryptocurrency',logo: 'reddit.jpg'},{name: 'r/btc',logo: 'reddit.jpg'},{name: 'r/bitcoin',logo: 'reddit.jpg'},{name: 'r/bitcoinmarkets',logo: 'reddit.jpg'},{name: 'r/binanceexchange',logo: 'reddit.jpg'},{name: 'r/ethereum',logo: 'reddit.jpg'},{name: 'r/ripple',logo: 'reddit.jpg'},{name: 'r/bitcoincash',logo: 'reddit.jpg'},{name: 'r/eos',logo: 'reddit.jpg'},{name: 'r/litecoin',logo: 'reddit.jpg'},{name: 'r/stellar',logo: 'reddit.jpg'},{name: 'r/cardano',logo: 'reddit.jpg'},{name: 'r/iota',logo: 'reddit.jpg'},{name: 'r/neo',logo: 'reddit.jpg'},{name: 'r/tronix',logo: 'reddit.jpg'},{name: 'r/monero',logo: 'reddit.jpg'},{name: 'r/dashpay',logo: 'reddit.jpg'},{name: 'r/ethereumclassic',logo: 'reddit.jpg'},{name: 'DataDash',logo: 'datadash.jpg'},{name: 'Doug Polk Crypto',logo: 'dougpolkcrypto.jpg'},{name: 'Chris Dunn',logo: 'chrisdunn.jpg'},{name: 'Boxmining',logo: 'boxmining.jpg'},{name: 'Ivan on Tech',logo: 'ivanontech.jpg'},{name: 'Suppoman',logo: 'suppoman.jpg'},{name: 'Coin Mastery',logo: 'coinmastery.jpg'},{name: 'Crypt0',logo: 'crypt0.jpg'},{name: 'CryptoDaily',logo: 'cryptodaily.jpg'},{name: 'Crypto Coin News',logo: 'cryptocoinnews.jpg'},{name: '@gavinandresen',logo: 'gavinandresen.jpeg'},{name: '@charlieshrem',logo: 'charlieshrem.jpg'},{name: '@vitalikbuterin',logo: 'vitalikbuterin.jpg'},{name: '@el33th4xor',logo: 'el33th4xor.jpg'},{name: '@Fehrsam',logo: 'fehrsam.jpg'},{name: '@twobitidiot',logo: 'twobitidiot.jpg'},{name: '@maxkeiser',logo: 'maxkeiser.jpg'},{name: '@rogerkver',logo: 'rogerkver.jpg'},{name: '@ljxie',logo: 'ljxie.jpg'},{name: '@ummjackson',logo: 'ummjackson.jpg'},{name: '@peterktodd',logo: 'peterktodd.jpg'},{name: '@jonmatonis',logo: 'jonmatonis.jpg'},{name: '@satoshilite',logo: 'satoshilite.jpg'},{name: '@erikvoorhees',logo: 'erikvoorhees.jpg'},{name: '@whalepanda',logo: 'N4IJRVNc_400x400.jpg'},{name: '@cryptoyoda1338',logo: 'cryptoyoda1338.jpg'},{name: '@cryptosqueeze',logo: 'cryptosqueeze.jpg'},{name: '@nictrades',logo: 'nictrades.jpg'},{name: '@cryptochoe',logo: 'cryptochoe.jpg'},{name: '@cryptodemedici',logo: 'cryptodemedici.jpg'},{name: '@cryptohustle',logo: 'cryptohustle.jpg'},{name: '@philakonecrypto',logo: 'philakonecrypto.jpg'},{name: '@tonevays',logo: 'tonevays.jpg'},{name: '@k1llerwh4le',logo: 'K1llerWh4le.jpg'},{name: '@beastlyorion',logo: 'beastlyorion.jpg'},{name: '@bitcoin_dad',logo: 'bitcoindad.jpg'},{name: '@jebus911',logo: 'jebus911.jpg'},{name: '@sicarious_',logo: 'sicarious.jpg'},{name: '@cryptomessiah',logo: 'cryptomessiah.jpg'}];


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  logos.forEach(value => {
    var sql = "UPDATE news_sources SET logo='" + value.logo + "' where name='" + value.name + "'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("logo added");
    });
  })

});

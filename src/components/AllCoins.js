import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {getGlobalData, getTickerData} from '../utils/crypto-listings.js';
import {getCoinDeskFeed} from '../utils/FeedStore/CoinDesk.js';
import parser from 'xml2js';
import NewsFeed from './NewsFeed.js';


class AllCoins extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      data: [],
      added_coins: [1],
      filtered_data: [],
      activePage: 0,
      globalData: {
        active_cryptocurrencies: 0,
        active_markets: 0,
        bitcoin_percentage_of_market_cap: 0,
        quotes: {
            USD: {
                total_market_cap: '',
                total_volume_24h: ''
              }
          },
          last_updated: ''
      },
      newsFeed: []
    };
}

  getTickerData(id){
    getTickerData(id).then((listings) => {
      this.setState({data: listings.data, filtered_data: listings.data});
    });
  }

  componentDidMount() {
    getGlobalData().then((data) => {this.setState({globalData: data.data})});

    getCoinDeskFeed().then((value) => {
      this.setState({newsFeed: value});
  });
    this.getTickerData(null);
  }

  handleInputChange = () => {
  this.setState({
    query: this.search.value
  }, () => {
    if (this.state.query && this.state.query.length > 1) {
      this.getFilteredResults(this.state.query);
    } else if (!this.state.query) {
      this.setState({filtered_data: this.state.data});
    }
  })
}

getFilteredResults(query){
  var a = [];
  const coins = this.state.data;
  for(var i=0; i< coins.length; i++)
  {
    if(coins[i].name.includes(query)){
      a.push(coins[i]);
    }
  }
  this.setState({filtered_data: a});
}


  render(){

    const CoinSuggestions = this.state.filtered_data.map(r => (
      <div key={r.id} className="home-coin-div">
            <Row className="coin-div">
              <Col sm={2} style={{verticalAlign: 'center'}}> {r.rank} </Col>
              <Col sm={10}>
              <Row>
              <div style={{display:'inline-flex'}}>
                  <p className="coin-name">{r.name}</p>
                  <p className="coin-symbol">{r.symbol}</p>
                  <button className={this.state.added_coins.includes(r.id) ? "home-added-coin-button" : "home-add-coin-button" } onClick={() => this.addCoin(r.id)}><img style={{marginBottom: '8px'}} src={this.state.added_coins.includes(r.id) ? "/home_coin_added.svg" : "/home_add_coin.svg"}/></button>
              </div>
              <div style={{float:'right'}}>${formatToUnits(r.quotes.USD.market_cap)}</div>
              </Row>
              <Row>
              <div style={{display:'inline-flex'}}>
                <p className="coin-price">${r.quotes.USD.price} </p>
                <p className={(r.quotes.USD.percent_change_1h > 0) ? "coin-percentage_increase" : "coin-percentage_decrease"}>({r.quotes.USD.percent_change_1h}%)</p>
              </div>
              <div className="coin-volume_24h">
                <p>${formatToUnits(r.quotes.USD.volume_24h)}</p>
              </div>
              </Row>
              </Col>
          </Row>

        </div>
    ));

    return(
      <div>
      <Grid>
        <Row>
          <Col md={4}>

            <GlobalData data={this.state.globalData}/>
            <form>
              <div className="home-serach-div">
              <input
                className="home-search"
                placeholder="Search for a coin.."
                ref={input => this.search = input}
                onChange={this.handleInputChange}
              />
              </div>
            </form>
            {CoinSuggestions}
          </Col>
          <Col md={8}>
            <div className="row">
                <DisplayNewsFeed data={this.state.newsFeed}/>
            </div>
          </Col>
        </Row>
      </Grid>
      </div>
    )
  }
}

function formatToUnits(number) {
  const abbrev = ['', 'K', 'M', 'B', 'T'];
  const order = Math.min(Math.floor(Math.log10(Math.abs(number)) / 3), abbrev.length - 1);
  const suffix = abbrev[order];
  return (number / Math.pow(10, order * 3)).toFixed(2) + suffix;
}

function DisplayNewsFeed(props) {
  return (props.data.map(item => <NewsFeed key={item.title} data={item}/>));
}

function GlobalData(props){
  return(
    <div className="golbal-data-div">
      <Row>
        <Col xs={4}>
          <Row className="global-data-header">Market Cap</Row>
           <Row className="global-data-content">${formatToUnits(props.data.quotes.USD.total_market_cap)}</Row>
        </Col>
        <Col xs={4}>
          <Row className="global-data-header">24h volume</Row>
          <Row className="global-data-content">${formatToUnits(props.data.quotes.USD.total_volume_24h)}</Row>
        </Col>
        <Col xs={4}>
          <Row className="global-data-header">BTC Dominance</Row>
          <Row className="global-data-content">{props.data.bitcoin_percentage_of_market_cap}%</Row>
        </Col>
      </Row>
    </div>

  )
}

export default AllCoins;

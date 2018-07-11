import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {getGlobalData, getTickerData} from '../utils/crypto-listings.js';
import {getCoinDeskFeed} from '../utils/FeedStore/CoinDesk.js';
import parser from 'xml2js';
import NewsFeed from './NewsFeed.js';
import CoinSuggestions from './CoinSuggestions.js';
import {formatToUnits} from '../utils/Formatter.js';


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
    if(coins[i].name.toLowerCase().includes(query.toLowerCase())){
      a.push(coins[i]);
    }
  }
  this.setState({filtered_data: a});
}


  render(){
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
              placeholder="Search for a coin"
              ref={input => this.search = input}
              onChange={this.handleInputChange}
            />
            </div>
          </form>
            {CoinSuggestions(this.state.filtered_data)}
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

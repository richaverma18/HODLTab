import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {getGlobalData, getTickerData} from '../utils/crypto-listings.js';
import {getFeedForSources} from '../utils/FeedStore/CoinDesk.js';
import parser from 'xml2js';
import NewsFeed from './NewsFeed.js';
import CoinSuggestions from './CoinSuggestions.js';
import {formatToUnits} from '../utils/Formatter.js';
import {getUserProfile} from '../utils/UserAPIHandler';
import { login, logout, isLoggedIn, getUserInfo } from '../Auth/AuthService';
import SourceLogosTopBar from './SourceLogosTopBar.js';
import { Link } from 'react-router-dom';


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
    this.getTickerData(null);
    this.setState({newsFeed: this.props.newsFeed});
  }

  componentDidUpdate(prevProps) {
  if (this.props.newsFeed !== prevProps.newsFeed) {
    this.setState({newsFeed: this.props.newsFeed});
  }
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
    const Logos = this.props.sources.map(source => (<img src={ '/source_logos/' + source.logo} alt={source.name} title={source.name} className="top-bar-logo" />));

    return(
      <div>
      <Grid>
        <Row>
          <Col md={4}>
            <div className="time-frame">1H</div>
            <div className="active-time-frame">1D</div>
            <div className="time-frame">7D</div>
            <div className="time-frame">1M</div>
            <div className="time-frame">3M</div>
            <div className="time-frame">1Y</div>
          </Col>
          <Col md={8}>
          <div className="row top-bar-row">
            <div className="all-sources-top-bar"><span className="all-sources-text">ALL</span></div>
            {Logos}
            <div className="add-source-top-bar"><Link className="add-source-text" to="/customize_feed"> + </Link></div>
          </div>
          </Col>
        </Row>
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

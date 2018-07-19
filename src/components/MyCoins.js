import React, { Component } from 'react';
import {getUserProfile} from '../utils/UserAPIHandler';
import { login, logout, isLoggedIn, getUserInfo } from '../Auth/AuthService';
import {Grid, Row, Col} from 'react-bootstrap';
// import {getGlobalData, getTickerData} from '../utils/crypto-listings.js';
import {getFeedForSources} from '../utils/FeedStore/CoinDesk.js';
import parser from 'xml2js';
import NewsFeed from './NewsFeed.js';
import CoinSuggestions from './CoinSuggestions.js';
// import {formatToUnits} from '../utils/Formatter.js';
import { Redirect } from 'react-router-dom';
import {getTickerData} from '../utils/crypto-listings.js';

class MyCoins extends Component {
  constructor(props) {
    super(props);
    this.state= {
      coins: [],
      newsFeed: [],
      user: {}
    };
  }

  getCoinsData(coin_ids){
    getTickerData(null).then((listings) => {
      let a = [];
      for(var i=0; i< listings.data.length; i++)
      {
        if(coin_ids.includes(listings.data[i].id) ){
            a.push(listings.data[i]);
            // console.log(a);
        }
      }
      this.setState({coins: a});
      // console.log(listings.data);
      // console.log(this.state);
    });
  }

  componentDidMount(){
    const auth_user = getUserInfo();
    if (auth_user === null || auth_user === ''){
      login();
    }
    else{
      getUserProfile(auth_user.email).then(user => {
        console.log(user);
        this.setState({user: user});
        if(user.coins){
          this.getCoinsData(user.coins.map(coin => coin.market_cap_id));
        }
        if(user.news_sources.length > 0){
          getFeedForSources(user.news_sources).then(value => {
            this.setState({newsFeed: value});
          });
        }
      });
    }
  }

  render(){
    return(
      <div>
      <Grid>
        <Row>
          <Col md={4}>
            {CoinSuggestions(this.state.coins)}
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

function DisplayNewsFeed(props){
  return (props.data.map(item => <NewsFeed key={item.title} data={item}/>));
}

export default MyCoins;

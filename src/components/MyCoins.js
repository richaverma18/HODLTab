import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import NewsFeed from './NewsFeed.js';
import CoinSuggestions from './CoinSuggestions.js';
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
        }
      }
      this.setState({coins: a});
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.newsFeed !== prevProps.newsFeed) {
      this.setState({newsFeed: this.props.newsFeed});
    }
    if (this.props.coins !== prevProps.coins) {
      this.setState({coins: this.props.coins});
    }
    if (this.props.user !== prevProps.user) {
      this.setState({user: this.props.user});
    }
  }

  componentDidMount(){
    this.setState({newsFeed: this.props.newsFeed});
    this.setUser(this.props.user);
  }

  setUser(user){
    this.setState({user: user});
    if(user && user.coins){
      this.getCoinsData(user.coins.map(coin => coin.market_cap_id));
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.newsFeed !== prevProps.newsFeed) {
      this.setState({newsFeed: this.props.newsFeed});
    }
    if (this.props.user !== prevProps.user) {
      this.setUser(this.props.user);
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

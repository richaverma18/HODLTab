import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import NewsFeed from './NewsFeed.js';
import CoinSuggestions from './CoinSuggestions.js';
import { Redirect } from 'react-router-dom';
import {getTickerData} from '../utils/crypto-listings.js';
import { Link } from 'react-router-dom';

class MyCoins extends Component {
  constructor(props) {
    super(props);
    this.state= {
      coins: [],
      newsFeed: [],
      user: {},
      filtered_sources: []
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
      this.setState({newsFeed: this.props.newsFeed, filtered_sources: this.props.newsFeed});
    }
    if (this.props.coins !== prevProps.coins) {
      this.setState({coins: this.props.coins});
    }
    if (this.props.user !== prevProps.user) {
      this.setState({user: this.props.user});
    }
  }

  componentDidMount(){
    this.setState({newsFeed: this.props.newsFeed, filtered_sources: this.props.newsFeed});
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
      this.setState({newsFeed: this.props.newsFeed, filtered_sources: this.props.newsFeed});
    }
    if (this.props.user !== prevProps.user) {
      this.setUser(this.props.user);
    }
  }

  getFilteredNewsFeed(query){
    var a = [];
    const feed = this.state.newsFeed;
    for(var i=0; i< feed.length; i++)
    {
      if(feed[i].siteName.toLowerCase().includes(query.toLowerCase())){
        a.push(feed[i]);
      }
    }
    this.setState({filtered_sources: a});
  }


  render(){
    const Logos = this.props.sources.map(source => (<div key={source.name} onClick={() => this.getFilteredNewsFeed(source.name)}><img src={ '/source_logos/' + source.logo} alt={source.name} title={source.name} className="top-bar-logo" /></div>));

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
          <div className="all-sources-top-bar" onClick={() => this.getFilteredNewsFeed('')}><span className="all-sources-text">ALL</span></div>
          {Logos}
          <div className="add-source-top-bar"><Link className="add-source-text" to="/customize_feed"> + </Link></div>
        </div>
        </Col>
      </Row>

        <Row>
          <Col md={4}>
            {CoinSuggestions(this.state.coins)}
          </Col>
          <Col md={8}>
            <div className="row">
                <DisplayNewsFeed data={this.state.filtered_sources}/>
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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Grid, Row, Col,Tabs, Tab} from 'react-bootstrap';
import AllCoins from './AllCoins';
import MyCoins from './MyCoins';
import './Home.css';
import { login, logout, isLoggedIn, getUserInfo } from '../Auth/AuthService';
import {getUserProfile} from '../utils/UserAPIHandler';
import {getFeedForSources} from '../utils/FeedStore/CoinDesk.js';
import {shuffle} from '../utils/Formatter.js';

class Home extends Component{
    constructor(props){
      super(props);
      this.handleSelect = this.handleSelect.bind(this);
      this.state = {
        key: 2,
        isLoggedIn: isLoggedIn(),
        user: {news_sources:[]},
        newsFeed: []
      };
    }
    handleSelect(key) {
      this.setState({ key });
    }
    handleLogout = () => {
      logout();
      this.setState({isLoggedIn: isLoggedIn()});
      window.location.href = "/";
    }

    showTabContent = (e) => {
        if(e.currentTarget.id === "my-coins"){
          document.getElementById("all-coins-pane").style.display = "none";
          document.getElementById("my-coins-pane").style.display = "block";
          e.currentTarget.className = "active";
          document.getElementById("all-coins").className = "";
      }
      else{
          document.getElementById("my-coins-pane").style.display = "none";
          document.getElementById("all-coins-pane").style.display = "block";
          e.currentTarget.className = "active";
          document.getElementById("my-coins").className = "";
      }
    }

    componentDidMount(){
      const auth_user = getUserInfo();
      if (auth_user === null || auth_user === ''){
        login();
      }
      else{
        getUserProfile(auth_user.email).then(user => {
          this.setState({user: user});
          if(user.news_sources.length > 0){
            console.log(user.news_sources);
            getFeedForSources(user.news_sources.map(source => source.id)).then(value => {
              this.setState({newsFeed: shuffle(value)});
            });
          }
        });
      }
    }

    render() {
      let activeTab = (this.props.location.state && this.props.location.state.tab) ? 'all' : 'my';
      let style = {display:'none'};
      return (
        <div className="crypto-container">
          <nav className="navbar navbar-default crypto-navbar">
              <div className="col-xs-1 navbar-header">
                <Link to="/">
                  <img className="img-responsive" style={{paddingTop:'12px'}} src="/HODLTAB.png" />
                </Link>
              </div>
              <div className="col-xs-10">
              <ul className="nav nav-tabs">
                  <li onClick={this.showTabContent} id="my-coins" className={(activeTab === 'my') ? 'active' : ''}><a href="#">MY COINS</a></li>
                  <li onClick={this.showTabContent} id="all-coins" className={(activeTab === 'all') ? 'active' : ''}><a href="#">ALL COINS</a></li>
              </ul>
              </div>

            <div className="col-xs-1 landing-navbar-links navbar-right">
              <button className="btn sign-up-button log" onClick={() => this.handleLogout()}>LOG OUT </button>
            </div>
          </nav>

          <div className="card">
              <div id="my-coins-pane" style={(activeTab === 'all') ? style : {}} className="tab-pane">
                  <MyCoins user={this.state.user} sources={this.state.user.news_sources} newsFeed={this.state.newsFeed}/>
              </div>
              <div id="all-coins-pane" style={(activeTab === 'my') ? style : {}} className="tab-pane">
                <AllCoins sources={this.state.user.news_sources} newsFeed={this.state.newsFeed}/>
              </div>
          </div>
        </div>
        )
      }
}

export default Home;

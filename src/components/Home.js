import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Grid, Row, Col,Tabs, Tab} from 'react-bootstrap';
import AllCoins from './AllCoins';
import MyCoins from './MyCoins';
import './Home.css';
import { login, logout, isLoggedIn, getUserInfo } from '../Auth/AuthService';
import {getUserProfile} from '../utils/UserAPIHandler';
import {getFeedForSources} from '../utils/FeedStore/CoinDesk.js';

class Home extends Component{
    constructor(props){
      super(props);
      this.handleSelect = this.handleSelect.bind(this);
      this.state = {
        key: 2,
        isLoggedIn: isLoggedIn(),
        user: {},
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
            getFeedForSources(user.news_sources).then(value => {
              this.setState({newsFeed: value});
            });
          }
        });
      }
    }

    render() {
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
                  <li onClick={this.showTabContent} id="my-coins"><a href="#">MY COINS</a></li>
                  <li onClick={this.showTabContent} id="all-coins"><a href="#">ALL COINS</a></li>
              </ul>
              </div>

            <div className="col-xs-1 landing-navbar-links navbar-right">
              <button className="btn sign-up-button log" onClick={() => this.handleLogout()}>LOG OUT </button>
            </div>
          </nav>

          <div className="card">
              <div id="my-coins-pane"  className="tab-pane">
                  <MyCoins user={this.state.user} newsFeed={this.state.newsFeed}/>
              </div>
              <div id="all-coins-pane" style={{display:'none'}} className="tab-pane">
                <AllCoins newsFeed={this.state.newsFeed}/>
              </div>
          </div>


        </div>
        )
      }
}

export default Home;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { login, logout, isLoggedIn } from './Auth/AuthService';
import { Redirect } from 'react-router-dom';
import AllCoins from './components/AllCoins';
import {getFeedForSources, getSourceInfo} from './utils/FeedStore/CoinDesk.js';
import {shuffle} from './utils/Formatter.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: isLoggedIn(),
      newsFeed: [],
      sources:[]
    };
  }

  handleLogout = () => {
    logout();
    this.setState({isLoggedIn: isLoggedIn()});
    window.location.href = "/";
  }

  componentDidMount(){
    getSourceInfo([1,2,3,5,32,33,59,61]).then(value => {
      this.setState({sources: value});
    });
    getFeedForSources([1,2,3,5,32,33,59,61]).then(value => {
      this.setState({newsFeed: shuffle(value)});
    });
  }

  render() {
    return (
      <div>
      <nav className="navbar navbar-default landing-navbar">
              <div className="navbar-header landing-navbar-brand">
              <Link to="/">
              <img className="img-responsive" src="/HODLTAB.png" />
              </Link>
            </div>
            <ul className="nav navbar-right landing-navbar-links">
              <li><Link className="landing-navbar-links" to='/contact'>CONTACT</Link></li>
              <li><Link className="landing-navbar-links" to='/home'>HOME</Link></li>
              <li>
                {this.state.isLoggedIn ? ( <button className="btn sign-up-button log" onClick={() => this.handleLogout()}>LOG OUT </button> ) : ( <button className="sign-up-button" onClick={() => login()}>LOG IN/SIGN UP</button> )}
              </li>
            </ul>
          </nav>
          <div className="all-coins-div">
            <AllCoins sources={this.state.sources} newsFeed={this.state.newsFeed}/>
          </div>
      </div>
    );
  }
}

// <Content/>
// <li><Link className="landing-navbar-links" to='/home'>HOME</Link></li>
//


class Content extends React.Component {
   render() {
      return (
        <Grid className="container-custom">
          <Row>
            <Col sm={5}>
              <p className="landing-content-header">The Crypto Trader{'\''}s Best Kept Secret</p>
              <p className="landing-content">HODLTab is a new-tab Chrome extension that aggregates best content from 250+ sources for coins you want to track</p>
                <Row style={{paddingTop: '30px'}}>
                <Col sm={8}><button className="landing-download-button" href="#"><img src="/chrome.png" /><span className="download-button-content">Download now</span></button></Col>
                <Col sm={4} style={{paddingTop:'20px'}}><Link className="landing-preview" to={{pathname: '/home',state: {tab: true}}}>See preview</Link></Col>
                </Row>
            </Col>
            <Col sm={7} style={{paddingRight:'0px'}}>
              <img className="landing-image" src="/Rectangle.png" />
            </Col>
          </Row>
        </Grid>
      );
   }
}
export default App;

// {
// !isAuthenticated() && (
// <li><Link className="sign-up-button" to='/login'>LOG IN/SIGN UP</Link></li>
// )
// }
// {
// isAuthenticated() && (
// <li><Link to='/logout'>Logout</Link></li>
// )
// }

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Grid, Row, Col,Tabs, Tab} from 'react-bootstrap';
import isAuthenticated from '../Auth/isAuthenticated';
import AllCoins from './AllCoins';
import MyCoins from './MyCoins';
import './Home.css';



class Home extends Component{
    constructor(props){
      super(props);
      this.handleSelect = this.handleSelect.bind(this);
      this.state = {
        key: 2
      };
    }
    handleSelect(key) {
      this.setState({ key });
    }

    render() {

      return (
        <div className="crypto-container">
          <nav className="navbar navbar-default landing-navbar">
              <div className="navbar-header">
                <img className="img-responsive" style={{paddingTop:'5px'}} src="/HODLTAB.png" />
              </div>
            <div className="landing-navbar-links navbar-right">
              <Link className="sign-up-button " to='/logout'>LOGOUT</Link>
            </div>
          </nav>

          <div className="card">
            <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
              <Tab eventKey={1}  title="MY COINS">
                <MyCoins/>
              </Tab>
              <Tab eventKey={2} title="ALL COINS">
                <AllCoins/>
              </Tab>
            </Tabs>
          </div>
        </div>
        )
      }
}

export default Home;
// <Link className="navbar-right" style={{paddingRight: '30px', marginTop:'-4px'}} to='/home'><button className="next-button">NEXT</button></Link>
// {
//   isAuthenticated() && (
//
//   )
// }

// <ul className="nav nav-tabs">
//   <li className="nav-item"><MyCoins className="nav-link active"/>MY COINS</li>
//   <li className="nav-item"><AllCoins className="nav-link"/>ALL COINS</li>
// </ul>

// <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
//   <Tab eventKey={1} title="Tab 1">
//     Tab 1 content
//   </Tab>
//   <Tab eventKey={2} title="Tab 2">
//     Tab 2 content
//   </Tab>
// </Tabs>

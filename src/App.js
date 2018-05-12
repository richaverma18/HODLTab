import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return (
      <div>
         <Header/>
         <Content/>
      </div>
    );
  }
}

class Header extends Component {
   render() {
      return (
        <nav className="navbar navbar-default landing-navbar">
                <div className="navbar-header landing-navbar-brand">
                <img className="img-responsive" src="/HODLTAB.png" />
              </div>
              <ul className="nav navbar-right landing-navbar-links">
                <li><a className="landing-navbar-links">CONTACT</a></li>
                <li><a className="landing-navbar-links">LOG IN</a></li>
                <li><button className="sign-up-button">SIGN UP </button></li>
              </ul>
            </nav>
      );
   }
}
class Content extends React.Component {
   render() {
      return (
        <Grid className="container-custom">
          <Row>
            <Col sm={6}>
              <code><p className="landing-content-header">The Crypto Traders Best Kept Secret</p></code>
              <code><p className="landing-content">HODLTab is a new-tab Chrome extension that aggregates best content from 250+ sources for coins you want to track</p></code>
                <Row>
                <Col sm={6}><button className="landing-download-button" href="#"><img src="/chrome.png" /><p className="download-button-content">Download now</p></button></Col>
                <Col sm={6} style={{paddingTop:'15px'}}><a href="#" className="landing-preview">See preview</a></Col>
                </Row>
            </Col>
            <Col sm={6}>
              <Image className="landing-image img-responsive" src="/Rectangle 2.png" />
            </Col>
          </Row>
        </Grid>
      );
   }
}
export default App;

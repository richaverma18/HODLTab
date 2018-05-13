import React, { Component } from 'react';
import {Navbar, NavItem, Nav, Image, Button, Grid, Row, Col, Collapse, Brand, Toggle} from 'react-bootstrap';
import './onboarding.css';


class Onboarding extends Component{
  render() {
      return (
        <div>
        <nav className="navbar navbar-default landing-navbar">
          <div className="navbar-header landing-navbar-brand">
            <img className="img-responsive" src="/HODLTAB.png" />
          </div>
        </nav>
        <Content/>
        </div>
      );
    }
}

class Content extends Component{
  render() {
     return (
       <div className="container">
          <div className="onboarding-header"><p>Create an account</p></div>
          <div className="onboarding-content"><p>This helps you to save your preferences, use HODLTab across multiple devices and much more.</p></div>
          <div><button className="login-button" href="#"><img src="/google.png" /><p className="login-button-content">Continue with Google</p></button></div>
          <div><button className="login-button" href="#"><img src="/twitter.png" /><p className="login-button-content">Continue with Twitter</p></button></div>
          <div><button className="login-button" href="#"><img src="/email.png" /><p className="login-button-content">Continue with Email</p></button></div>
          <div className="skip-link"><a className="skip-link" href="#">Skip for now</a></div>
      </div>
     );
  }
}
<button className="landing-download-button" href="#"><img src="/chrome.png" /><p className="download-button-content">Download now</p></button>

export default Onboarding;

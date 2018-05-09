import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Navbar, NavItem, Nav, Image, Button, Grid, Row, Col, Collapse, Brand, Toggle} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Navbar fluid collapseOnSelect>
            <Navbar.Header className="landing-navbar-header">
              <Image className="img-responsive" src="/HODLTAB.png" />
            </Navbar.Header>

            <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav pullRight className="landing-navbar-links">
              <NavItem eventKey={1} href="#">
                CONTACT
              </NavItem>
              <NavItem eventKey={2} href="#">
                LOGIN
              </NavItem>
              <NavItem eventKey={3} href="#">
                SIGNUP
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
   }
}
class Content extends React.Component {
   render() {
      return (
        <Grid className="container-custom">
          <Row>
            <Col sm={5}>
              <code><p className="landing-content-header">The Crypto Traders Best Kept Secret</p></code>
              <code><p className="landing-content">HODLTab is a new-tab Chrome extension that aggregates best content from 250+ sources for coins you want to track</p></code>
                <Row>
                <Col sm={8}><button className="landing-download-button" href="#"><Image src="/chrome.png" /><p>     Download now</p></button></Col>
                <Col sm={4}><a className="landing-preview" href="#">See preview</a></Col>
                </Row>
            </Col>
            <Col sm={7}>
              <Image className="landing-image img-responsive" src="/Rectangle 2.png" />
            </Col>
          </Row>
        </Grid>
      );
   }
}
export default App;

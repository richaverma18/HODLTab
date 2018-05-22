import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import './CustomizeFeed.css';


class CustomizeFeed extends Component{


  render() {

      return (
        <div className="crypto-container">
          <nav className="navbar navbar-default landing-navbar">
            <div className="navbar-header">
              <img className="img-responsive" style={{paddingTop:'5px'}} src="/HODLTAB.png" />
            </div>
            <Link className="navbar-right" style={{paddingRight: '30px', marginTop:'-4px'}} to='/home'><button className="next-button">NEXT</button></Link>
          </nav>
          <div className="crypto-welcome-header"><p>Customize your feed</p></div>
          <div className="crypto-welcome-text"><p>Here are some sources we’ve picked for you. <br/> Again, you can always change these later!</p> </div>
          <Grid className="container-custom">
            <Row>
              <Col sm={8}>
                <button className="all-sources">All Sources</button>
                <button className="categories">News</button>
                <button className="categories">Twitter</button>
                <button className="categories">Reddit</button>
                <button className="categories">Youtube</button>
              </Col>
              <Col sm={4}>
              <form>
                <input
                  className="customize-feed-search-box"
                  placeholder="Search for a source"
                  ref={input => this.search = input}
                />
                
              </form>
              </Col>
            </Row>
          </Grid>
        </div>

      );
    }
}

export default CustomizeFeed;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import isAuthenticated from '../Auth/isAuthenticated';



class Home extends Component{
  render() {

      return (
        <div className="crypto-container">
          <nav className="navbar navbar-default landing-navbar">
            <div className="navbar-header">
              <img className="img-responsive" style={{paddingTop:'5px'}} src="/HODLTAB.png" />
            </div>
            <Link className="navbar-right" to='/logout'>Logout</Link>
          </nav>
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

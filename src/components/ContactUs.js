import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { login, logout, isLoggedIn } from '../Auth/AuthService';

class ContactUs extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: isLoggedIn()
    };
  }

  handleLogout = () => {
    logout();
    this.setState({isLoggedIn: isLoggedIn()});
    window.location.href = "/";
  }

  render(){
    return(
      <div>
      <nav className="navbar navbar-default landing-navbar">
              <div className="navbar-header landing-navbar-brand">
              <Link to="/">
              <img className="img-responsive" src="/HODLTAB.png" />
              </Link>
            </div>
            <ul className="nav navbar-right landing-navbar-links">
              <li>
                {this.state.isLoggedIn ? ( <button className="btn sign-up-button log" onClick={() => this.handleLogout()}>LOG OUT </button> ) : ( <button className="sign-up-button" onClick={() => login()}>LOG IN/SIGN UP</button> )}
              </li>
            </ul>
          </nav>
          <div className="contact-us-div">
            <span className="contact-us-header"> CONTACT US </span>
            <br/><br/><br/>
            <span className="contact-us-text"> Have Questions? We{'\''}re happy to help! </span>
            <br/><br/>
            <span className="contact-us-email"> Drop us a mail at <a style={{color: '#645997'}} href="#">abhinavc@hodltab.com</a> and we{'\''}ll reach out to you! </span>
          </div>
      </div>
    );
  }

}

export default ContactUs;

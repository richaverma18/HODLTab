import React, { Component } from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import './onboarding.css';

class Onboarding extends Component{
  getFormData() {
      return {
        email: ReactDOM.findDOMNode(this.refs.email).value,
        password: ReactDOM.findDOMNode(this.refs.password).value
      };
  }

  login(event) {
      // event.preventDefault();
      const user = this.getFormData();
      this.props.auth.login(user.email, user.password);
    }

    signup() {
      const user = this.getFormData();
      this.props.auth.signup(user.email, user.password);
    }

    loginWithGoogle() {
      this.props.auth.loginWithGoogle();
    }

    loginWithTwitter() {
      this.props.auth.loginWithTwitter();
    }

  render() {
      return (
        <div>
        <nav className="navbar navbar-default landing-navbar">
          <div className="navbar-header landing-navbar-brand">
            <img className="img-responsive" src="/HODLTAB.png" />
          </div>
        </nav>
        <div className="container">
           <div className="onboarding-header"><p>Create an account</p></div>
           <div className="onboarding-content"><p>This helps you to save your preferences, use HODLTab across multiple devices and much more.</p></div>
           <form>
           <FormGroup>
             <ControlLabel>Email</ControlLabel>
             <FormControl
               type="email"
               ref="email"
               placeholder="you@example.com"
             />
           </FormGroup>
           <FormGroup>
             <ControlLabel>Password</ControlLabel>
             <FormControl
               type="password"
               ref="password"
               placeholder="Enter your password"
             />
           </FormGroup>
           <ButtonToolbar>
               <Button
                 type="submit"
                 bsStyle="primary"
                 onClick={this.login.bind(this)}
               >
                 Log In
               </Button>
               <Button bsStyle="primary" onClick={this.signup.bind(this)}>
                 Sign Up
               </Button>
             </ButtonToolbar>
           </form>
           <div><button className="login-button" href="#"><img src="/google.png" /><p className="login-button-content">Continue with Google</p></button></div>
           <div><button className="login-button" href="#"><img src="/twitter.png" /><p className="login-button-content">Continue with Twitter</p></button></div>
           <div><button className="login-button" href="#"><img src="/email.png" /><p className="login-button-content">Continue with Email</p></button></div>
           <div className="skip-link"><a className="skip-link" href="#">Skip for now</a></div>
       </div>
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
          <form>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="email"
              ref="email"
              placeholder="you@example.com"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              ref="password"
              placeholder="Enter your password"
            />
          </FormGroup>
          <ButtonToolbar>
              <Button
                type="submit"
                bsStyle="primary"
                onClick={this.login.bind(this)}
              >
                Log In
              </Button>
              <Button bsStyle="primary" onClick={this.signup.bind(this)}>
                Sign Up
              </Button>
            </ButtonToolbar>
          </form>
          <div><button className="login-button" href="#"><img src="/google.png" /><p className="login-button-content">Continue with Google</p></button></div>
          <div><button className="login-button" href="#"><img src="/twitter.png" /><p className="login-button-content">Continue with Twitter</p></button></div>
          <div><button className="login-button" href="#"><img src="/email.png" /><p className="login-button-content">Continue with Email</p></button></div>
          <div className="skip-link"><a className="skip-link" href="#">Skip for now</a></div>
      </div>
     );
  }
}
export default Onboarding;

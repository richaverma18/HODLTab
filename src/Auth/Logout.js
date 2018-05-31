import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {} from './AuthService.js';

class Logout extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Redirect to={{
        pathname: '/login',
        state: { from: this.props.location }
      }} />
    );
  }
}

export default Logout;

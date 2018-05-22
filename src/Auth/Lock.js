import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth0Lock from 'auth0-lock';
import { AUTH_CONFIG } from './auth0-config';

class Lock extends Component {
  lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
    auth: {
      responseType: 'token id_token',
      sso: false,
    },
    theme: {
      logo: '/HODL-logo.svg',
      primaryColor: '#655A98'
    },
    languageDictionary: {
    title: ""
  },
  });

  constructor(props) {
    super(props);
    this.state = { loggedIn : false };
    this.onAuthenticated = this.onAuthenticated.bind(this);

    this.onAuthenticated();
  }

  onAuthenticated() {
    this.lock.on('authenticated', (authResult) => {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      this.lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
      // Handle error
        console.log(error.message);
        return;
    }
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile', JSON.stringify(profile));

  });

      this.setState({ loggedIn: true });
    });
  }

  componentDidMount() {
    // Avoid showing Lock when hash is parsed.
    if ( !(/access_token|id_token|error/.test(this.props.location.hash)) ) {
      this.lock.show();
    }
  }

  render() {
    const style = { marginTop: '32px' }

    return(
      !this.state.loggedIn ? (
        <div></div>
      ) : (
        <Redirect to={{
          pathname: '/select_crypto',
          state: { from: this.props.location }
        }} />
      )
    );
  }
}

export default Lock;

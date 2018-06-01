import React,{ Component } from 'react';
import SelectCrypto from '../components/SelectCrypto';
import { setIdToken, setAccessToken, getProfile, getUserInfo } from './AuthService';

class Callback extends Component {

  constructor() {
    super()
  }

  componentDidMount() {
    setAccessToken();
    setIdToken();
    window.location.href = "/select_crypto";
  }

  render() {
    return null;
  }
}

export default Callback;

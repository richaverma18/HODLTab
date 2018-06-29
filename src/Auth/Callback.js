import React,{ Component } from 'react';
import SelectCrypto from '../components/SelectCrypto';
import Home from '../components/Home';
import { setIdToken, setAccessToken, getUserInfo } from './AuthService';
import {getUserProfile, createUser} from '../utils/UserAPIHandler';
import { Redirect } from 'react-router-dom';

class Callback extends Component {

  constructor() {
    super();
    this.state = {
      user: {}
    };
  }
  componentWillMount() {
    setAccessToken();
    setIdToken();

  }

  componentDidMount(){
    const auth_user = getUserInfo();
    getUserProfile(auth_user.email).then(user => {
      console.log(user);
      if(user === null || user.length === 0){
        createUser({name: auth_user.name, email: auth_user.email}).then(result => {
          this.setState({user: {id: result.insertId}});
          console.log("user state");
          console.log(this.state);
        });
      }
      else{
        this.setState({user: user});
      }
    });
    // console.log(this.state.user);
    // console.log("user");
  }

  getNextPage(){
    if (this.state.user){
      if(this.state.user.coins && this.state.user.coins.length > 0){
        return <div><Redirect to={{pathname: '/home', state: {user: this.state.user}}} /></div>;
      }
      else{
        return <div><Redirect to={{pathname: '/select_crypto', state: {user_id: this.state.user.id}}}/></div>;
      }
    }else{
      return null;
    }
  }

  render() {
    const Page = this.getNextPage();
    return (
      {Page}
    )
  }
}

export default Callback;

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
        });
      }
      else{
        this.setState({user: user});
      }
    });
    // console.log(this.state.user);
    // console.log("user");
  }

  render() {
    // console.log(this.state.user);
    const Page = (this.state.user && this.state.user.coins && this.state.user.coins.length > 0) ? <Redirect to={{pathname: '/home', state: {user_id: this.state.user.id}}} /> : <Redirect to={{pathname: '/select_crypto', state: {user_id: this.state.user.id}}}/>
    // console.log(Page);
    return (
      <div>
        {Page}
      </div>
    )
    // return null;
  }
}

export default Callback;

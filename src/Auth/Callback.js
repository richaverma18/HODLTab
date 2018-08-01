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
    // console.log(auth_user);
    getUserProfile(auth_user.email).then(user => {
      if(user === null || user.length === 0){
        var name = auth_user.name;
        if(name.includes('@')){
          name = auth_user.nickname;
        }
        createUser({name: name, email: auth_user.email}).then(result => {
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

  getNextPage(){
    if (this.state.user.id){
      if(this.state.user.coins && this.state.user.coins.length > 0){
        return <Redirect to={{pathname: '/home', state: {user: this.state.user}}} />;
      }
      else{
        return <Redirect to={{pathname: '/select_crypto', state: {user_id: this.state.user.id}}}/>;
      }
    }else{
      return null;
    }
  }

  render() {
    if(this.state.user.id){
      console.log("in set local user id");
      localStorage.setItem('user_id',this.state.user.id);
    }
    const Page = this.getNextPage();
    return (
      <div>{Page}</div>
    )
  }
}

export default Callback;

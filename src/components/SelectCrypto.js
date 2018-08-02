import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SelectCrypto.css';
import {getTickerData} from '../utils/crypto-listings.js';
import axios from 'axios';
import Pagination from "react-js-pagination";
import {getUserInfo} from '../Auth/AuthService';
import {addUserCoinsAPI} from '../utils/UserAPIHandler';

function Welcome(props){
  return(
    <div>
      <div className="crypto-welcome-header"><p>Welcome, {props.username}!</p></div>
      <div className="crypto-welcome-text"><p>What cryptocurrencies do you want to follow? <br/>Don’t worry, you can always change these later</p> </div>
    </div>
  );
}

class SelectCrypto extends Component{
  constructor(props){
    super(props);
    this.state = {
      query: '',
      data: [],
      added_coins: [],
      filtered_data: [],
      activePage: 0
  };
}

  getListings(){
    getTickerData().then((listings) => {
      this.setState({data: listings.data, filtered_data: listings.data});
    });
  }

  componentDidMount() {
    this.getListings();
  }

  handleInputChange = () => {
  this.setState({
    query: this.search.value
  }, () => {
    if (this.state.query && this.state.query.length > 1) {
      this.getFilteredResults(this.state.query);
    } else if (!this.state.query) {
      this.setState({filtered_data: this.state.data});
    }
  })
}

getFilteredResults(query){
  var a = [];
  const coins = this.state.data;
  for(var i=0; i< coins.length; i++)
  {
    if(coins[i].name.toLowerCase().includes(query.toLowerCase())){
      a.push(coins[i]);
    }
  }
  this.setState({filtered_data: a});
}

  handlePageChange(pageNumber) {
    // console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

// handler to add coins:
  addCoin(coin) {
    this.setState({added_coins: this.state.added_coins.concat(coin)});
    // console.log(coin_id);
    // console.log(this.state.added_coins);
  }

  addUserCoins(){
    // console.log(this.state.added_coins);
    // console.log(this.props.location.state.user_id);
    addUserCoinsAPI({user_id: this.props.location.state.user_id, coins: this.state.added_coins});
  }

  render() {

    let startIndex = this.state.activePage * 10;
    let endIndex = startIndex + 10;
    let displayCoins = this.state.filtered_data.slice(startIndex, endIndex);

    const user = getUserInfo();
    const name = user.name.includes('@') ? user.nickname : user.name;

    const CoinSuggestions = displayCoins.map(r => (
        <div key={r.id} className="crypto-coin-suggestion">
        {r.name}
        <span className="crypto-coin-symbol">{r.symbol}</span>
        <button className={this.state.added_coins.map(coin => coin.id).includes(r.id) ? "added-coin-button" : "add-coin-button" } onClick={() => this.addCoin(r)}><img src={this.state.added_coins.includes(r) ? "/coin_added.svg" : "/add_button.svg"}/></button>
        </div>
      ));

      const isNextButtonEnabled = (this.state.added_coins.length > 0) ? true : false

      return (
        <div className="crypto-container">
        <nav className="navbar navbar-default crypto-navbar">
          <div className="navbar-header">
          <Link to="/">
            <img className="img-responsive" style={{paddingTop:'5px'}} src="/HODLTAB.png" />
          </Link>
          </div>
          <Link className="navbar-right" style={{paddingRight: '24px', marginTop:'-4px'}} to={{pathname: '/customize_feed',state: {id: this.props.location.state.user_id } }}><button className={isNextButtonEnabled ? "next-button" : "next-button disabled-next-button"} disabled={!isNextButtonEnabled} onClick={()=>this.addUserCoins()}>Next</button></Link>
        </nav>
        <Welcome username={name}/>
        <form>
          <div className="crypto-serach-div">
          <input
            className="crypto-search-box"
            placeholder="Search for a coin"
            ref={input => this.search = input}
            onChange={this.handleInputChange}
          />
          </div>
        </form>
        {CoinSuggestions}
        <div className="crypto-pagination">
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.state.filtered_data.length}
          pageRangeDisplayed={10}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
        </div>
      );
    }
}

export default SelectCrypto;

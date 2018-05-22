import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SelectCrypto.css';

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
      isNextButtonEnabled: true,
      query: '',
      results: [{id: 1, name: 'Bitcoin', isAdded: false}, {id:2, name: 'Ethereum',isAdded: false}, {id: 3, name: 'Ripple',isAdded: false}, {id: 4, name: 'EOS',isAdded: false}, {id: 5, name: 'Cardano',isAdded: false}]};
  }


  // handler to enable/disable next button
  addCoin = () => {
    this.setState(prevState => ({
      isNextButtonEnabled: !prevState.isNextButtonEnabled
    }));
  }

  handleInputChange = () => {
  this.setState({
    query: this.search.value
  }, () => {
    if (this.state.query && this.state.query.length > 1) {
      if (this.state.query.length % 2 === 0) {
        // this.getInfo()
      }
    } else if (!this.state.query) {
    }
  })
}

  handleClick(coin_id) {
    const results = [];
    for (var i=0; i<this.state.results.length; i++){
      results[i] = this.state.results[i];
      if(this.state.results[i].id === coin_id){
        results[i].isAdded = !this.state.results[i].isAdded;
      }
    }
    this.setState({results: results})
    console.log(coin_id);
  }


  render() {
    // const username = JSON.parse(localStorage.getItem('profile'));
    const CoinSuggestions = this.state.results.map(r => (
        <div key={r.id} className="crypto-coin-suggestion">
        {r.name}
        <button className={!r.isAdded ? "add-coin-button" : "added-coin-button"} onClick={() => this.handleClick(r.id)}><img src={!r.isAdded ? "/add_button.svg" : "/coin_added.svg"}/></button>
        </div>
      ));
      return (
        <div className="crypto-container">
        <nav className="navbar navbar-default landing-navbar">
          <div className="navbar-header">
            <img className="img-responsive" style={{paddingTop:'5px'}} src="/HODLTAB.png" />
          </div>
          <Link className="navbar-right" style={{paddingRight: '30px', marginTop:'-4px'}} to='/customize_feed'><button className={this.state.isNextButtonEnabled ? "next-button" : "next-button disabled-next-button"} disabled={!this.state.isNextButtonEnabled}>NEXT</button></Link>
        </nav>
        <Welcome username='Richa'/>
        <form>
          <div className="crypto-serach-div">
          <input
            className="crypto-search-box"
            placeholder="Search for a coin.."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
          />
          </div>
        </form>
        {CoinSuggestions}
        </div>
      );
    }
}

export default SelectCrypto;

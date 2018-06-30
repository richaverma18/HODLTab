import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {formatToUnits} from '../utils/Formatter.js';
import {addUserCoinsAPI} from '../utils/UserAPIHandler';


export default function CoinSuggestions(coins){
  return coins.map(r => (
    <div key={r.id} className="home-coin-div">
          <Row className="coin-div">
            <Col sm={2}><div className="home-coin-rank"> {r.rank} </div></Col>
            <Col sm={10}>
            <Row>
            <div style={{display:'inline-flex'}}>
                <p className="coin-name">{r.name}</p>
                <p className="coin-symbol">{r.symbol}</p>
                <button className={true ? "home-added-coin-button" : "home-add-coin-button" } onClick={() => addCoin(r)}><img style={{marginBottom: '8px'}} src={true ? "/home_coin_added.svg" : "/home_add_coin.svg"}/></button>
            </div>
            <div className="home-coin-market-cap">${formatToUnits(r.quotes.USD.market_cap)}</div>
            </Row>
            <Row>
            <div style={{display:'inline-flex'}}>
              <p className="coin-price">${r.quotes.USD.price} </p>
              <p className={(r.quotes.USD.percent_change_1h > 0) ? "coin-percentage_increase" : "coin-percentage_decrease"}>({r.quotes.USD.percent_change_1h}%)</p>
            </div>
            <div className="coin-volume_24h">
              <p>${formatToUnits(r.quotes.USD.volume_24h)}</p>
            </div>
            </Row>
            </Col>
        </Row>

      </div>
  ));
}

function addCoin(coin){
  addUserCoinsAPI({user_id: 1, coins: [coin]});
}

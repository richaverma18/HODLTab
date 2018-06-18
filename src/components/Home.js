import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Grid, Row, Col,Tabs, Tab} from 'react-bootstrap';
import AllCoins from './AllCoins';
import MyCoins from './MyCoins';
import './Home.css';
import { logout, isLoggedIn } from '../Auth/AuthService';




class Home extends Component{
    constructor(props){
      super(props);
      this.handleSelect = this.handleSelect.bind(this);
      this.state = {
        key: 2,
        isLoggedIn: isLoggedIn()
      };
    }
    handleSelect(key) {
      this.setState({ key });
    }
    handleLogout = () => {
      logout();
      this.setState({isLoggedIn: isLoggedIn()});
      window.location.href = "/";
    }

    showTabContent = (e) => {
        if(e.currentTarget.id === "my-coins"){
          document.getElementById("all-coins-pane").style.display = "none";
          document.getElementById("my-coins-pane").style.display = "block";
          e.currentTarget.className = "active";
          document.getElementById("all-coins").className = "";
      }
      else{
          document.getElementById("my-coins-pane").style.display = "none";
          document.getElementById("all-coins-pane").style.display = "block";
          e.currentTarget.className = "active";
          document.getElementById("my-coins").className = "";
      }
    }


    render() {

      return (
        <div className="crypto-container">
          <nav className="navbar navbar-default crypto-navbar">
              <div className="col-xs-1 navbar-header">
                <Link to="/">
                  <img className="img-responsive" style={{paddingTop:'12px'}} src="/HODLTAB.png" />
                </Link>
              </div>
              <div className="col-xs-10">
              <ul className="nav nav-tabs">
                  <li onClick={this.showTabContent} id="my-coins"><a href="#">MY COINS</a></li>
                  <li onClick={this.showTabContent} id="all-coins"><a href="#">ALL COINS</a></li>
              </ul>
              </div>

            <div className="col-xs-1 landing-navbar-links navbar-right">
              <button className="btn sign-up-button log" onClick={() => this.handleLogout()}>LOG OUT </button>
            </div>
          </nav>

          <div className="card">
              <div id="my-coins-pane"  className="tab-pane">
                  <MyCoins/>
              </div>
              <div id="all-coins-pane" style={{display:'none'}} className="tab-pane">
                <AllCoins/>
              </div>
          </div>


        </div>
        )
      }
}

// <div className="col-xs-10 card">
//   <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
//     <Tab eventKey={1}  title="MY COINS">
//       <MyCoins/>
//     </Tab>
//     <Tab eventKey={2} title="ALL COINS">
//       <AllCoins/>
//     </Tab>
//   </Tabs>
// </div>


// <a id="controlled-tab-example-tab-1" role="tab" aria-controls="controlled-tab-example-pane-1" tabindex="-1" aria-selected="false" href="#">MY COINS</a></li><li role="presentation" class="active"><a id="controlled-tab-example-tab-2" role="tab" aria-controls="controlled-tab-example-pane-2" aria-selected="true" href="#">ALL COINS</a></li></ul>


              // <ul role="tablist" className="nav nav-tabs">
              //     <li id="my-coins" onClick=this.showTabContent()><a dataToggle="tab" href="#">MY COINS</a></li>
              //     <li><a id="all-coins" dataToggle="tab" href="#">ALL COINS</a></li>
              // </ul>


              // <div className="card">
              //     <div id="my-coins-pane" ariaLabelledby="my-coins" className="tab-pane fade in active">
              //         <MyCoins/>
              //     </div>
              //     <div id="all-coins-pane" ariaLabelledby="all-coins" className="tab-pane fade">
              //       <AllCoins/>
              //     </div>
              // </div>

// <div id="controlled-tab-example-pane-1" aria-labelledby="controlled-tab-example-tab-1" role="tabpanel" aria-hidden="true" class="fade tab-pane"><p> my coins </p></div>
//
//
// <div id="controlled-tab-example-pane-2" aria-labelledby="controlled-tab-example-tab-2" role="tabpanel" aria-hidden="false" class="fade tab-pane active in"><div>

// <div className=" col-xs-10 card">
//   <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
//     <Tab eventKey={1}  title="MY COINS">
//       <MyCoins/>
//     </Tab>
//     <Tab eventKey={2} title="ALL COINS">
//       <AllCoins/>
//     </Tab>
//   </Tabs>
// </div>



// <div className="container collapse navbar-collapse card">
// <ul class="nav nav-tabs ">
// <li><Link to="/all_coins">MENU-ITEMS1</a></li>
// <li><Link href="/my_coins">MENU-ITEMS2</a></li>
// <li><Link href="#/menu3">MENU-ITEMS3</a></li>
// <li><a href="#/menu4">MENU-ITEMS4</a></li>
// </ul>
// </div>

export default Home;
// <Link className="navbar-right" style={{paddingRight: '30px', marginTop:'-4px'}} to='/home'><button className="next-button">NEXT</button></Link>
// {
//   isAuthenticated() && (
//
//   )
// }

// <ul className="nav nav-tabs">
//   <li className="nav-item"><MyCoins className="nav-link active"/>MY COINS</li>
//   <li className="nav-item"><AllCoins className="nav-link"/>ALL COINS</li>
// </ul>

// <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
//   <Tab eventKey={1} title="Tab 1">
//     Tab 1 content
//   </Tab>
//   <Tab eventKey={2} title="Tab 2">
//     Tab 2 content
//   </Tab>
// </Tabs>

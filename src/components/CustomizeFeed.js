import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import './CustomizeFeed.css';
import {getNewsFeedSources, getAddedSources} from '../utils/FeedStore/CoinDesk.js';
import {addSources} from '../utils/UserAPIHandler';


class CustomizeFeed extends Component{

  constructor(props){
    super(props);
    this.state={
      sources: [],
      added_sources: []
    };
  }

  componentDidMount(){
    // console.log(this.props.location.state.id);
    getNewsFeedSources().then((value) => {
      console.log(value);
      this.setState({sources: value});
    });

    // getAddedSources(this.props.location.state.id).then((value) => {
    //   console.log(value);
    //   this.setState({added_sources: value});
    // });

  }

  addSource(source_id) {
    this.setState({added_sources: this.state.added_sources.concat(source_id)});
  }

  addSources(){
    console.log(this.props.location.state.id);
    addSources({user_id: this.props.location.state.id, source_ids: this.state.added_sources});
  }


  render() {

      return (
        <div className="crypto-container">
          <nav className="navbar navbar-default landing-navbar">
            <div className="navbar-header">
              <img className="img-responsive" style={{paddingTop:'5px'}} src="/HODLTAB.png" />
            </div>
            <Link className="navbar-right" style={{paddingRight: '30px', marginTop:'-4px'}} to='/home'><button className="next-button" onClick={() => this.addSources()}>NEXT</button></Link>
          </nav>
          <div className="crypto-welcome-header"><p>Customize your feed</p></div>
          <div className="crypto-welcome-text"><p>Here are some sources we’ve picked for you. <br/> Again, you can always change these later!</p> </div>
          <Grid className="container-custom">
            <Row style={{paddingBottom: '40px'}}>
              <Col sm={8}>
                <button className="all-sources">All Sources</button>
                <button className="categories">News</button>
                <button className="categories">Twitter</button>
                <button className="categories">Reddit</button>
                <button className="categories">Youtube</button>
                <button className="categories">Facebook</button>
                </Col>
              <Col sm={4}>
              <form>
                <input
                  className="customize-feed-search-box"
                  placeholder="Search for a source"
                  ref={input => this.search = input}
                />

              </form>
              </Col>
            </Row>
            <Row>
              {this.state.sources.map(source => (
                <div key={source.id} className="col-sm-4">
                  <div className="source-div">
                    <Row>
                      <Col sm={2}>
                        <img className="source-logo" src="" />
                      </Col>
                      <Col sm={7}>
                        <Row>
                          <div className="source-name">{source.name}</div>
                        </Row>

                        <Row>
                          <div className="source-link">{source.url}</div>
                        </Row>
                      </Col>
                      <Col sm={3}>
                          <button className={this.state.added_sources.includes(source.id) ? "source-added" : "add-source" } onClick={() => this.addSource(source.id)}><img src={this.state.added_sources.includes(source.id) ? "/coin_added.svg" : "/add_button.svg"}/></button>
                      </Col>
                    </Row>
                    <Row>
                      <p className="source-description">{source.description}</p>
                    </Row>
                    <Row className="source-traffic">
                      <p style={{fontWeight: 'bold', paddingRight:'4px'}}>{source.traffic}</p> <p>{source.type}</p>
                    </Row>
                  </div>
                </div>
              ))
            }
            </Row>
          </Grid>
        </div>
      );
    }
}
export default CustomizeFeed;

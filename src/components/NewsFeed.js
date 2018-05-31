import React from 'react';
import './NewsFeed.css';
function NewsFeed(props) {

  // var tags = [];
  // for(let i=0;i<props.data.tags.length; i++){
  //   tags.push(<div key={tag} className="news-feed-tags"><p> {props.data.tags[i]} </p></div>);
  // }
  const tags = props.data.tags.map(tag => (<div key={tag} className="news-feed-tags">
  <p> {tag} </p></div>));
  var style;
  if(props.data.image){
    style={marginLeft: '0px', backgroundImage: "url(" + props.data.image + ")",backgroundSize: 'cover', height: '112px', width: '285px'};
  }
  else {
    style={marginLeft: '10px'};
  }
  //
  // function redirectToLink(link){
  //
  // }

  return (
    <div className="col-sm-4">
      <div className="news-feed-div">
        <div className="row" style={style}>{tags}</div>
        <div className="news-feed-title">
          <a className="news-feed-link" href={props.data.link} target="_blank">
          {props.data.title}
          </a>
        </div>
        <div className="news-feed-description">
          {props.data.description}
        </div>
        <div className="news-feed-bottom">
          <img className="news-feed-logo" src={props.data.siteLogo}/>
          <p className="news-feed-source">{props.data.siteName}</p>
          <p className="news-feed-pub-time">{convertPubDate(props.data.pubDate)} ago</p>
        </div>
      </div>
    </div>
  );
};


function convertPubDate(date){
  var timeDifference = ((Date.now() - Date.parse(date))/(1000*60));
  if(timeDifference >60){
    if(timeDifference/60 > 24){
      return Math.round(timeDifference/(60*24)).toString() + "day";
    }
    return Math.round(timeDifference/60).toString() + "hrs";
  }else{
    return Math.round(timeDifference).toString() + "mins";
  }
}

export default NewsFeed;

import React from 'react';
import './NewsFeed.css';
import YouTube from './YouTube';

function NewsFeed(props) {

  const tags = props.data.tags.map(tag => (<div key={tag} className="news-feed-tag">
  <p> {tag} </p></div>));
  var style;
  if(props.data.image){
    style={marginLeft: '0px', backgroundImage: "url(" + props.data.image + ")",backgroundSize: 'cover', height: '112px', width: '285px', WebkitBorderRadius: '4px 4px 0px 0px', borderRadius: '4px 4px 0px 0px'};
  }
  else {
    style={marginLeft: '0px'};
  }
// 'mYFaghHyMKc'
  return (
    <div className="col-sm-4">
      <div className="news-feed-div">
        <div className="row" style={style}>
          {props.data.video ? <YouTube video={props.data.video} autoplay="0" rel="0" modest="1" /> : ''}
          <div className="news-feed-tags">{tags}</div>
        </div>
        <div className="news-feed-title">
          <a className="news-feed-link" href={props.data.link} target="_blank">
            {props.data.title}
          </a>
        </div>
        <div className="news-feed-description">
          {props.data.description}
        </div>
        <div className="row news-feed-bottom">
          <div className="col-sm-8" style={{display:'inline-flex', paddingLeft: '0px'}}>
          <img className="news-feed-logo" src={props.data.siteLogo || '/source_logos/' + props.data.siteName.replace(/\s+/g, '').toLowerCase() + ".jpg"}/>
          <p className="news-feed-source">{props.data.siteName}</p>
          </div>
          <div className="col-sm-4 news-feed-pub-time"><span style={{float: 'right'}}>{convertPubDate(props.data.pubDate)} ago</span></div>
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

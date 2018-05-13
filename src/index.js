import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Onboarding from './components/onboarding.js';
import { Router, Route, browserHistory } from 'react-router';

// import 'bootstrap/dist/css/bootstrap.min.css';

const Root = () => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/onboarding" component={Onboarding}/>
      </Router>
    </div>
  )
}
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();

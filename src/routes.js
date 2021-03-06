import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import App from './App';
import Onboarding from './components/onboarding.js';
import history from './history';
import Private from './components/Home';
import SelectCrypto from './components/SelectCrypto';
import CustomizeFeed from './components/CustomizeFeed';
import Home from './components/Home';
import Callback from './Auth/Callback';
import { requireAuth } from './Auth/AuthService.js';
import ContactUs from './components/ContactUs';
// const auth = new Auth();
//
// const handleAuthentication = (nextState, replace) => {
//   if (/access_token|id_token|error/.test(nextState.location.hash)) {
//     auth.handleAuthentication();
//   }
// }

export const makeMainRoutes = () => {
  return (
      <Router history={history} component={App}>
            <Switch>
              <Route exact path="/" component={App} />
              <Route path="/select_crypto" component={SelectCrypto} onEnter={requireAuth}/>
              <Route path="/customize_feed" component={CustomizeFeed} />
              <Route path="/home" component={Home} onEnter={requireAuth}/>
              <Route path="/callback" component={Callback} />
              <Route path="/contact" component={ContactUs}/>
            </Switch>
      </Router>
  );
}

// <Route path="/home" component={Home} />


//
//

//
// <Route path="/login" render={(props) => <Login auth={auth} {...props} />} />
// <Route path="/" render={(props) => <App auth={auth} {...props} />} />



// export default makeMainRoutes;

// const Root = () => {
//   return (
//     <div>
//       <Router history={browserHistory}>
//         <Route path="/" component={App}/>
//         <Route path="/onboarding" component={Onboarding}/>
//       </Router>
//     </div>
//   )
// }

// <Route path="/login" render={(props) => <Login auth={auth} {...props} />} />
// <Route path="/callback" render={(props) => {
//   handleAuthentication(props);
//   return <Callback {...props} />
// }}/>

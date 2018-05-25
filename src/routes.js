import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import App from './App';
import Onboarding from './components/onboarding.js';
import history from './history';
import Private from './components/Home';
import Login from './Auth/Login';
import Logout from './Auth/Logout';
import SelectCrypto from './components/SelectCrypto';
import CustomizeFeed from './components/CustomizeFeed';
import Home from './components/Home';

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
        <div>
            <Switch>
              <Route exact path="/" component={App} />
              <Route path="/login" component={Login} />
              <Route path="/select_crypto" component={SelectCrypto} />
              <Route path="/logout" component={Logout} />
              <Route path="/customize_feed" component={CustomizeFeed} />
              <Route path="/home" component={Home} />
            </Switch>
        </div>
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

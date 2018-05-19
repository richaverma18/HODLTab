import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {makeMainRoutes} from './routes';
// import 'bootstrap/dist/css/bootstrap.min.css';

const routes = makeMainRoutes();
ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();

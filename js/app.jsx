import React from 'react';
import ReactDOM from 'react-dom';
import {IndexLink, Router, Route, Link, IndexRoute, hashHistory} from 'react-router';
import '../main.scss';

import {Template} from './components/template.jsx';
import {Home} from './components/home.jsx';
import {Search} from './components/search.jsx';
import {About} from './components/about.jsx';
import {DestinationsList} from './components/destinations.jsx';
import {NotFound} from './components/not_found.jsx';



class App extends React.Component {
  render(){
    return <Router history={hashHistory}>
            <Route path='/' component={Template}>
              <IndexRoute component={Home} />
              <Route path='/search' component={Search} />
              <Route path='/about' component={About} />
              <Route path='/about/destinations' component={DestinationsList} />
              <Route path='*' component={NotFound} />
            </Route>
          </Router>
  }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});

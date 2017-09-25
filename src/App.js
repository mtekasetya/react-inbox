import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Inbox from './inbox/Inbox';
import Toolbar from './inbox/Toolbar';
import Compose from './inbox/Compose';

const App = () => (
  <Router>
    <div className="container">
      <Toolbar/>
      <Switch>
        <Route path="/messages/:id" exact component={Compose}/>
        <Route path="/compose" exact component={Compose}/>
      </Switch>
      <Inbox/>
    </div>
  </Router>
);

export default App;

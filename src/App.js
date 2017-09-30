import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Messages from './inbox/Messages';
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
      <Messages/>
    </div>
  </Router>
);

export default App;

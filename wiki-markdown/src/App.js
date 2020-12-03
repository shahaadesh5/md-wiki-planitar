import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Article from './components/Article/Article';

import './App.css';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/articles/:name" component={Article} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

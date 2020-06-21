import React from 'react';
import Landing from './views/landing';
import CreatePage from './views/create';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

class App extends React.Component{
  render(){
    return (
      <Router>
        <Route exact path="/" component={Landing} />
        <Route path="/create" component={CreatePage} />
      </Router>
    )
  }
}

export default App;

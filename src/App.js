import React from 'react';
import Landing from './views/landing';
import CreatePage from './views/create';
import SignIn from './views/sign-in';
import SignUp from './views/sign-up';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

class App extends React.Component{
  render(){
    return (
      <Router>
        <Route exact path="/" component={Landing} />
        <Route path="/create" component={CreatePage} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </Router>
    )
  }
}

export default App;

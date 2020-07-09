import React from 'react';
import Landing from './views/landing';
import CreatePage from './views/create';
import SignIn from './views/sign-in2';
import SignUp from './views/sign-up2';
import Profile from './views/profile';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';


class App extends React.Component{

  render(){
    return (
      <Router>
        <Route exact path="/" component={Landing} />
        <Route path="/create" component={CreatePage} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/:userId" component={Profile} />
      </Router>
    )
  }
}

export default App;

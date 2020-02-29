import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';

function App() {
  return (
    <Router basename="/star-wars">
      <Route exact path='/login' component={Login} />
      <Route exact path='/' component={Dashboard} />
    </Router>
  );
}

export default App;

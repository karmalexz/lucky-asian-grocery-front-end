import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'
import NavBar from './Navbar';
import Products from './Products';
import Categories from './Categories'
import Login from './Login'

class Home extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/"  component={NavBar} />
          <Route exact path="/products" component={Products}/>
          <Route exact path="/categories" component={Categories}/>
          <Route exact path="/login" component={Login}/>
        </Router>
      </div>
    );
  }
}

export default Home;
import React, { Component } from 'react';
import '../../main.scss';
import { Route, Switch } from 'react-router-dom'
import { Home } from '../Home/Home'
import { Favorites } from '../Favorites/Favorites'
import { Login } from '../Login/Login'
import { NavBar } from '../NavBar/NavBar'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home}>Home</Route>
          <Route exact path='/Favorites' component={Favorites}>Favs</Route>
          <Route exact path='/Login' component={Login}>Login</Route>
        </Switch>
      </div>
    );
  }
}


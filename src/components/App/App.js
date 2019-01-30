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

// ComponentDidMount 
    // this will check if they have a UN & PW in local storage
        // if yes it will fetch their user info from back end
    // this will make the initial movie fetch
        //then put the movies in store
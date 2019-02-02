import React, { Component } from 'react';
import '../../main.scss';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Home from '../Home/Home'
import Favorites from '../Favorites/Favorites'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'
import NavBar from '../NavBar/NavBar'
import { fetchData } from '../../helper/apiCall'
import { storeMovies } from '../../actions'
import { connect } from 'react-redux'

export class App extends Component {

  fetchAndStoreMovies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=4340824bb6ffe9ee70c52fc088a91d53&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
    const moviesData = await fetchData(url)
    const movies = moviesData.results
    this.props.dispatchStoreMovies(movies)
  }

  componentDidMount = () => {
    this.fetchAndStoreMovies()
  }

  render() {


    
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/Favorites' render={() => (
            this.props.currentUser ? (
             <Favorites />
            ) : (
                <Redirect to='/Login' />
              )
          )} />

          <Route exact path='/Login' render={() => (
            this.props.currentUser ? (
              <Redirect to='/' />
            ) : (
                <Login />
              )
          )} />
          <Route exact path='/SignUp' render={() => (
            this.props.currentUser ? (
              <Redirect to='/' />
            ) : (
                <SignUp />
              )
          )} />
        </Switch>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  currentUser: state.currentUser
})

export const mapDispatchToProps = (dispatch) => ({
  dispatchStoreMovies: (movies) => dispatch(storeMovies(movies))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))



// ComponentDidMount 
    // this will check if they have a UN & PW in local storage
        // if yes it will fetch their user info from back end
    // this will make the initial movie fetch
        //then put the movies in store
import React, { Component } from 'react';
import '../../main.scss';
import { Route, Switch, withRouter } from 'react-router-dom'
import  Home  from '../Home/Home'
import  Favorites  from '../../components/Favorites/Favorites'
import  Login  from '../../components/Login/Login'
import { NavBar } from '../../components/NavBar/NavBar'
import {fetchData} from '../../helper/apiCall'
import {storeMovies} from '../../actions'
import {connect} from 'react-redux'

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
          <Route exact path='/' component={Home}/>
          <Route exact path='/Favorites' component={Favorites}/>
          <Route exact path='/Login' component={Login}/>
        </Switch>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  dispatchStoreMovies: (movies) => dispatch(storeMovies(movies))
})

export default withRouter(connect(null, mapDispatchToProps)(App))



// ComponentDidMount 
    // this will check if they have a UN & PW in local storage
        // if yes it will fetch their user info from back end
    // this will make the initial movie fetch
        //then put the movies in store
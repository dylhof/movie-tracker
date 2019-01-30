import React, { Component } from 'react';
import '../../main.scss';
import { Route, Switch } from 'react-router-dom'
import  Home  from '../Home/Home'
import { Favorites } from '../Favorites/Favorites'
import { Login } from '../Login/Login'
import { NavBar } from '../NavBar/NavBar'
import {fetchData} from '../../helper/apiCall'
import {getMovies} from '../../actions'
import {connect} from 'react-redux'

class App extends Component {

  fetchAndStoreMovies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=4340824bb6ffe9ee70c52fc088a91d53&language=en-US&sort_by=release_date.asc&include_adult=true&include_video=false&page=1'
    const moviesData = await fetchData(url)
    const movies = moviesData.results
    this.props.getMovies(movies)
  
  }

  componentDidMount = () => {
 this.fetchAndStoreMovies()

  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/Favorites' component={Favorites}></Route>
          <Route exact path='/Login' component={Login}></Route>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getMovies: (movies) => dispatch(getMovies(movies))
})

export default connect(null, mapDispatchToProps)(App)



// ComponentDidMount 
    // this will check if they have a UN & PW in local storage
        // if yes it will fetch their user info from back end
    // this will make the initial movie fetch
        //then put the movies in store
import React, { Component } from 'react';
import '../../main.scss';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Home from '../Home/Home'
import Favorites from '../Favorites/Favorites'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'
import NavBar from '../NavBar/NavBar'
import MovieDetails from '../MovieDetails/MovieDetails'
import { fetchData } from '../../helper/apiCall'
import { storeMovies, setLoading, setError } from '../../actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {APIKEY} from '../../APIKEY';
import {NotFound} from '../../component/NotFound/NotFound';

export class App extends Component {

  fetchAndStoreMovies = async () => {
    this.props.dispatchSetLoading(true)
    try {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
      const moviesData = await fetchData(url)
      this.props.dispatchSetLoading(false)
      const movies = moviesData.results
      this.props.dispatchStoreMovies(movies)
    } catch (error) {
      this.props.dispatchSetError(error.message)
    }
  }

  componentDidMount = () => {
    this.fetchAndStoreMovies()
  }

  render() {
    
    const isCurrentUser = Object.keys(this.props.currentUser).length === 0 ? false : true
    return (
      <div className="App">
        <NavBar />
        <div className='error'>

        {
          this.props.error && this.props.error
        }
        </div>
        {
          this.props.isLoading ? <div>...Loading</div>
            :
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/favorites' render={() => (
                isCurrentUser ? (
                  <Favorites />
                ) : (
                    <Redirect to='/login' />
                  )
              )} />

              <Route path='/login' render={() => (
                isCurrentUser ? (
                  <Redirect to='/' />
                ) : (
                    <Login />
                  )
              )} />
              <Route path='/signUp' render={() => (
                isCurrentUser ? (
                  <Redirect to='/' />
                ) : (
                    <SignUp />
                  )
              )} />
              <Route path='/movie/:id' render={({ match }) => {
                const { id } = match.params
                const movie = this.props.movies.find(movie => movie.id === parseInt(id))
                if (movie) {
                  return <MovieDetails {...movie} />
                }
              }} />
              <Route component={NotFound}/>
            </Switch>
        }
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  error: state.error,
  movies: state.movies,
})

export const mapDispatchToProps = (dispatch) => ({
  dispatchStoreMovies: (movies) => dispatch(storeMovies(movies)),
  dispatchSetLoading: (bool) => dispatch(setLoading(bool)),
  dispatchSetError: (message) => dispatch(setError(message)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

App.propTypes = {
  dispatchStoreMovies: PropTypes.func,
  dispatchSetLoading: PropTypes.func,
  dispatchSetError: PropTypes.func,
  currentUser: PropTypes.object,
  error: PropTypes.string,
  movies: PropTypes.array
}
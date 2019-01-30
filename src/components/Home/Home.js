import React from 'react';
import {connect} from 'react-redux'

const Home = (props) => {
  const movieCards = props.movies.map(movie => {
    return <p>{movie.title}</p>
  })
  return (
    <div>{movieCards}</div>
  )
}

const mapStateToProps = (state) => ({
  movies: state.movies
})

export default connect(mapStateToProps)(Home)


// display all movies in store
// favorite funtionality will live on movie card

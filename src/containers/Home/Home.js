import React from 'react';
import { connect } from 'react-redux'

const Home = (props) => {

  const movieCards = props.movies.map(movie => {
    const poster = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
    const alt = `${movie.title} poster`
    return (
      <div>
        <h2>{movie.title}</h2>
        <img src={poster} alt={alt} />
      </div>
    )
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

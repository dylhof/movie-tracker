import React, { Component } from 'react';
import { connect } from 'react-redux'

export class Home extends Component{

  render() {
  const movieCards = this.props.movies.map(movie => {
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
}

export const mapStateToProps = (state) => ({
  movies: state.movies
})

export default connect(mapStateToProps)(Home)


// display all movies in store
// favorite funtionality will live on movie card

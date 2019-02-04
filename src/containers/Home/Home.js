import React, { Component } from 'react';
import { connect } from 'react-redux'
import MovieCard from '../MovieCard/MovieCard'

export class Home extends Component {

  render() {
    const movieCards = this.props.movies.map(movie => {
      return (
        <MovieCard {...movie} key={movie.id} />
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

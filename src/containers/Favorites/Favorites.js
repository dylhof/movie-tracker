import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard';
import PropTypes from 'prop-types';

export class Favorites extends Component {
  render() {
    const { movies, favorites } = this.props
    const displayFavorites = movies
      .filter(movie => favorites.includes(movie.id))
      .map(movie => {
        return (
          <MovieCard {...movie} key={movie.id} />
        )
      })

    return (
      <div>{displayFavorites}</div>
    )
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
  favorites: state.favorites
})

export default connect(mapStateToProps)(Favorites)

Favorites.propTypes = {
  favorites: PropTypes.array,
  movies: PropTypes.array
}
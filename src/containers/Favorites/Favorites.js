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
      <div>
        {!favorites.length ? 
        <div className='add-fave-div'><p className='add-fave-message'>You don't have any favorites yet! Add some to make movie magic!</p></div> : 
        <div className='favorites'>{displayFavorites}</div>}
      </div>
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
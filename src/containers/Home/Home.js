import React, { Component } from 'react';
import { connect } from 'react-redux'
import MovieCard from '../MovieCard/MovieCard'

export class Home extends Component {

  // handleFavoriteClick = (event) => {
  //  console.log(event.target.name)
  // }

  render() {
    const movieCards = this.props.movies.map(movie => {
      return (
        <MovieCard {...movie} />
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

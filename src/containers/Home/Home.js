import React from 'react'
import { connect } from 'react-redux'
import MovieCard from '../MovieCard/MovieCard'
import PropTypes from 'prop-types'

export const Home = (props) => {
    const movieCards = props.movies.map(movie => {
      return (
        <MovieCard {...movie} key={movie.id} />
      )
    })
    return (
      <div className='home'>{movieCards}</div>
    )
}

export const mapStateToProps = (state) => ({
  movies: state.movies
})

export default connect(mapStateToProps)(Home)

Home.propTypes = {
  movies: PropTypes.array
}
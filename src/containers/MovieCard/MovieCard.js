import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addFavorite, deleteFavorite } from '../../actions';
import { Link } from 'react-router-dom';
import * as helper from '../../helper/helpers'
import PropTypes from 'prop-types'

export class MovieCard extends Component {
  constructor() {
    super()
    this.state = {
      error: ''
    }
  }

  handleFavoriteClick = async (event) => {
    const { title, id, poster_path, release_date, vote_average, overview, currentUser } = this.props
    const isCurrentUser = Object.keys(currentUser).length === 0 ? false : true

    if (isCurrentUser && event.target.value === 'true') {
      const { userID } = currentUser
      try {
        await helper.tryUnfavorite(id, userID)
        this.props.dispatchDeleteFavorite(id)
      } catch (error) {
        this.setState({ error: 'Sorry! Something went wrong and we couldn\'t remove this movie from your favorites' })
      }
    } else if (isCurrentUser && event.target.value === 'false') {
      const { userID } = currentUser
      try {
        await helper.tryFavorite(title, id, userID, poster_path, release_date, vote_average, overview)
        this.props.dispatchAddFavorite(id)
      } catch (error) {
        this.setState({ error: 'Sorry! Something went wrong and we couldn\'t add this movie to your favorites' })
      }
    } else {
      this.setState({ error: 'Please login or create an acount to favorite your movies!' })
      setTimeout(() => {
        this.setState({ error: '' })
      }, 4000)
    }
  }

  render() {
    const { title, poster_path, id, favorites } = this.props
    const { error } = this.state
    const cssClasses = ["favorite-btn", favorites.includes(id) ? "isFavorite" : null]
    const value = favorites.includes(id) ? true : false
    const poster = `https://image.tmdb.org/t/p/w200/${poster_path}`
    const alt = `${title} poster`
    return (
      <div className='movie-card'>
        {error ?
          <span className='error-movie-card'>{error}</span>
          : null
        }
        <div className='title-favorite-div'>
          <h2>{title}</h2>
          <button className={cssClasses.join(' ')} value={value} onClick={(event) => this.handleFavoriteClick(event)}><i className='fas fa-star'></i></button>
        </div>
        <Link to={`/movie/${id}`}>
          <img className='movie-poster' src={poster} alt={alt} />
        </Link>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  favorites: state.favorites,
})

export const mapDispatchToProps = (dispatch) => ({
  dispatchAddFavorite: (id) => dispatch(addFavorite(id)),
  dispatchDeleteFavorite: (id) => dispatch(deleteFavorite(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard)

MovieCard.propTypes = {
  dispatchAddFavorite: PropTypes.func,
  dispatchDeleteFavorite: PropTypes.func,
  dispatchSetError: PropTypes.func,
  currentUser: PropTypes.object,
  favorites: PropTypes.array,
}
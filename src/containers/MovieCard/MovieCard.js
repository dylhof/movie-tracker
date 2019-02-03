import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addFavorite, deleteFavorite } from '../../actions';
import { Link } from 'react-router-dom';
import * as helper from '../../helper/helpers'

export class MovieCard extends Component {
  constructor() {
    super()
    this.state = {
      isUser: ''
    }
  }

  handleFavoriteClick = (event) => {
    const { title, id, poster_path, release_date, vote_average, overview } = this.props

    if (this.props.currentUser && event.target.value === 'true') {
      const { userID } = this.props.currentUser
      try {
        helper.tryUnfavorite(id, userID)
        this.props.dispatchDeleteFavorite(id)
      } catch (error) {
        this.props.dispatchSetError(error.message)
      }
    } else if (this.props.currentUser && event.target.value === 'false') {
      const { userID } = this.props.currentUser
      try {
        helper.tryFavorite(title, id, userID, poster_path, release_date, vote_average, overview)
        this.props.dispatchAddFavorite(id)
      } catch (error) {
        this.props.dispatchSetError(error.message)
      }
    } else {
      this.setState({
        isUser: 'Please login or create an acount to favorite your movies!'
      })
    }
  }

  render() {
    const { title, poster_path, id, favorites } = this.props
    const cssClasses = ["favorite-btn", favorites.includes(id) ? "isFavorite" : null]
    const value = favorites.includes(id) ? true : false
    const poster = `https://image.tmdb.org/t/p/w200/${poster_path}`
    const alt = `${title} poster`
    return (
      <div>
        <h2>{title}</h2>
        <Link to={`/movie/${id}`}>
          <img src={poster} alt={alt} />
        </Link>
        <button className={cssClasses.join(' ')} value={value} onClick={(event) => this.handleFavoriteClick(event)}><i className='fas fa-star'></i></button>
        <span>{this.state.isUser}</span>
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
  dispatchDeleteFavorite: (id) => dispatch(deleteFavorite(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard)



// If the user is logged in
  // check if the movie is a favorite
    // yes=> display with favorite indicated
// this will display a single movie 
// 
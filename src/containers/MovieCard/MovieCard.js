import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost } from '../../helper/apiCall'
import { addFavorite, deleteFavorite } from '../../actions';

export class MovieCard extends Component {
  constructor() {
    super()
    this.state = {
      isUser: '',
      error: ''
    }
  }

  handleFavoriteClick = async (event) => {
    const { title, id, poster_path, release_date, vote_average, overview } = this.props
    
    if (this.props.currentUser) {
      const {userID} = this.props.currentUser

      if (event.target.value === 'true') {
        try {
          const url = `http://localhost:3000/api/users/${userID}/favorites/${id}`
          const response = await fetchPost(url,
            {
              method: 'DELETE',
              body: JSON.stringify({
                user_id: userID,
                movie_id: id
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
          this.props.dispatchDeleteFavorite(id)
        } catch (error) {
          if (error.message === '500') {
            this.setState({ error: 'Something went wrong, favorite not added' })
          }
        }
      } else {
        try {
          const response = await fetchPost('http://localhost:3000/api/users/favorites/new',
            {
              method: 'POST',
              body: JSON.stringify({
                movie_id: id,
                user_id: userID,
                title,
                poster_path,
                release_date,
                vote_average,
                overview
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
          this.props.dispatchAddFavorite(id)
        } catch (error) {
          if (error.message === '500') {
            this.setState({ error: 'Something went wrong, favorite not added' })
          }
        }
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
    // const {currentUser} = this.props.currentUser
    const value = favorites.includes(id) ? true : false
    const poster = `https://image.tmdb.org/t/p/w200/${poster_path}`
    const alt = `${title} poster`
    return (
      <div>
        <h2>{title}</h2>
        <img src={poster} alt={alt} />
        {/* <p>{name}</p> */}
        {/*onClick make fetch to add(api/users/favorites/new)
       send(movie_id, user_id, title, poster_path, release_date vote_average, overview),
       action = ADD_FAVORITE, DELETE_FAVORITE */}
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
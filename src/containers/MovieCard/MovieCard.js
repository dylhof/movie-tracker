import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchPost} from '../../helper/apiCall'

export class MovieCard extends Component {
  constructor() {
    super()
    this.state = {
      isUser: '',
      error: ''
    }
  }

  handleFavoriteClick = async () => {
    const { title, id, poster_path, release_date, vote_average, overview } = this.props
    if (this.props.currentUser) {
      try {
        const response = await fetchPost('http://localhost:3000/api/users/favorites/new',
          {
            method: 'POST',
            body: JSON.stringify({
              movie_id: id,
              user_id: this.props.currentUser.id,
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
        // this.props.dispatchSetCurrentUser(this.state.name, response.id)
      } catch (error) {
        if (error.message === '500') {
          this.setState({ error: 'Something went wrong' })
        }
      }
    } else {
      this.setState({
        isUser: 'Please login or create an acount to favorite your movies!'
      })
    }
  }
  render() {
    // debugger
    // const {currentUser} = this.props.currentUser
    const { title, poster_path } = this.props
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
        <button onClick={() => this.handleFavoriteClick()}><i className='fas fa-star'></i></button>
        <span>{this.state.isUser}</span>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  currentUser: state.currentUser
})

export default connect(mapStateToProps)(MovieCard)



// If the user is logged in
  // check if the movie is a favorite
    // yes=> display with favorite indicated
// this will display a single movie 
// 
import React, { Component } from 'react';
import { fetchPost, fetchData } from '../../helper/apiCall'
import { setCurrentUser, addAllUserFavorites } from '../../actions';
import { connect } from 'react-redux';

export class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      error: ''
    }
  }
  handleChange = (event) => {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    } else {
      this.setState({ password: event.target.value })
    }
  }

  //   sign in   /api/users
  // Create Account - /api/users / new
  //   Add Favorite - /api/users / favorites / new
  //   Receive All Favorites - /api/users /: user_id / favorites
  // Delete a Favorite - /api/users /: user_id / favorites /: movie_id

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetchPost('http://localhost:3000/api/users',
        {
          method: 'POST',
          body: JSON.stringify({ email: this.state.username.toLowerCase(), password: this.state.password }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        // if(!response.ok) {
        //   throw Error(response.statusText)
        // }
        const user_id = response.data.id
        this.props.dispatchSetCurrentUser(response.data.name, user_id)
        // debugger

      const url = `http://localhost:3000/api/users/${user_id}/favorites`
      const favoritesResponse = await fetchData(url)
       console.log(favoritesResponse)
      //  debugger
        const favoriteIDs = favoritesResponse.data.map(favorite => favorite.movie_id)
      this.props.dispatchAddAllUserFavorites(favoriteIDs)
    } catch (error) {
      if (error.message === '500') {
        this.setState({ error: "Email or Password doesn't match" })
      }
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name='username' value={this.state.username} onChange={this.handleChange} />
        <input name='password' value={this.state.password} onChange={this.handleChange} />
        <button>Submit</button>
        <span>{this.state.error}</span>
      </form>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  dispatchSetCurrentUser: (name, id) => dispatch(setCurrentUser(name, id)),
  dispatchAddAllUserFavorites: (favorites) => dispatch(addAllUserFavorites(favorites))
})

export default connect(null, mapDispatchToProps)(Login)

// login form:
// local state to store what they are typing in (control form)
// username field
// password field
// submit/ login button
// link to sign up form


// sign up form:
// local storage (control form)
// name field
// username field
// pw field
// submit/signup
// link to log in
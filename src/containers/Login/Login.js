import React, { Component } from 'react';
import { fetchPost, fetchData } from '../../helper/apiCall'
import { setCurrentUser, addAllUserFavorites } from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

export class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }
  handleChange = (event) => {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    } else {
      this.setState({ password: event.target.value })
    }
  }

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
      const user_id = response.data.id
      this.props.dispatchSetCurrentUser(response.data.name, user_id)
      const url = `http://localhost:3000/api/users/${user_id}/favorites`
      const favoritesResponse = await fetchData(url)
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
      <div className='login-form-div'>
      <form className='login-form' onSubmit={this.handleSubmit}>
        <div className='login-inner-div'>
          <label for='login-email' className='login-label'>Email</label>
          <input id='login-email' className='login-input' name='username' value={this.state.username} onChange={this.handleChange} type='email'/>
        </div>
        <div className='login-inner-div'>
          <label for='login-password' className='login-label'>Password</label>
          <input id='login-password' className='login-input' name='password' value={this.state.password} onChange={this.handleChange} />
        </div>
        <button className='login-submit'>Submit</button>
        <span>{this.state.error}</span>
      </form>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  dispatchSetCurrentUser: (name, id) => dispatch(setCurrentUser(name, id)),
  dispatchAddAllUserFavorites: (favorites) => dispatch(addAllUserFavorites(favorites))
})

export default connect(null, mapDispatchToProps)(Login)

Login.propTypes = {
  dispatchSetCurrentUser: PropTypes.func,
  dispatchAddAllUserFavorites: PropTypes.func
}
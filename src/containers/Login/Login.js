import React, { Component } from 'react';
import { fetchPost, fetchData } from '../../helper/apiCall'
import { setCurrentUser, addAllUserFavorites, setError } from '../../actions';
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
      this.props.dispatchSetError(error.message)
    }
  }

  render() {
    const { error } = this.props
    const { username, password } = this.state
    return (
      <div className='login-form-div'>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <div className='login-inner-div'>{error}</div>
          <div className='login-inner-div'>
            <label htmlFor='login-email' className='login-label'>Email</label>
            <input id='login-email' className='login-input' name='username' value={username} onChange={this.handleChange} type='email' />
          </div>
          <div className='login-inner-div'>
            <label htmlFor='login-password' className='login-label'>Password</label>
            <input id='login-password' className='login-input' name='password' value={password} onChange={this.handleChange} />
          </div>
          <button className='login-submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  dispatchSetCurrentUser: (name, id) => dispatch(setCurrentUser(name, id)),
  dispatchAddAllUserFavorites: (favorites) => dispatch(addAllUserFavorites(favorites)),
  dispatchSetError: (message) => dispatch(setError(message))
})

export default connect(null, mapDispatchToProps)(Login)

Login.propTypes = {
  dispatchSetCurrentUser: PropTypes.func,
  dispatchAddAllUserFavorites: PropTypes.func,
  dispatchSetError: PropTypes.func
}
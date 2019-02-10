import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchPost, fetchData } from '../../helper/apiCall'
import { setCurrentUser, addAllUserFavorites, setError } from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

export class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      error: '',
    }
  }
  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
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
      this.setState({error: "That email and password combination do not match our records!" })
      setTimeout(() => {
        this.setState({ error: '' })
      }, 4000)
    }
  }

  render() {
    const { username, password, error } = this.state
    return (
      <div className='login-form-div'>
        {error ?
          <span className='error-movie-card'>{error}</span>
          : null
        }
        <form className='login-form' onSubmit={this.handleSubmit}>
        <p className='signup-message'>Please login to add movies to your favorites!</p>
          <div className='login-inner-div'>
            <label htmlFor='login-email' className='login-label'>Email</label>
            <input id='login-email' className='login-input' name='username' value={username} onChange={this.handleChange} type='email' />
          </div>
          <div className='login-inner-div'>
            <label htmlFor='login-password' className='login-label'>Password</label>
            <input id='login-password' className='login-input' name='password' value={password} onChange={this.handleChange} type='password'/>
          </div>
          <button className='login-submit'>Submit</button>
          <p className='signup-message'>Don't have an account? <Link to={`/signup`}>Sign up!</Link></p>
        </form>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  dispatchSetCurrentUser: (name, id) => dispatch(setCurrentUser(name, id)),
  dispatchAddAllUserFavorites: (favorites) => dispatch(addAllUserFavorites(favorites)),
})

export default connect(null, mapDispatchToProps)(Login)

Login.propTypes = {
  dispatchSetCurrentUser: PropTypes.func,
  dispatchAddAllUserFavorites: PropTypes.func,
}
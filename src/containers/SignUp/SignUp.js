import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchPost } from '../../helper/apiCall';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../actions';
import PropTypes from 'prop-types'

export class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      error: ''
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { password, confirmPassword } = this.state
    if (password !== confirmPassword) {
      this.setState({ error: 'Your passwords do not match! Please try again' })
      setTimeout(() => {
        this.setState({ error: '' })
      }, 4000)
      return
    }
    try {
      const response = await fetchPost('http://localhost:3000/api/users/new',
        {
          method: 'POST',
          body: JSON.stringify({ name: this.state.name, email: this.state.username, password: this.state.password }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      this.props.dispatchSetCurrentUser(this.state.name, response.id)
      this.setState({ name: '', username: '', password: '', confirmPassword: ''})
    } catch (error) {
      this.setState({error: 'There was a problem signing you up. Please try again'})
      setTimeout(() => {
        this.setState({ error: '' })
      }, 4000)
    }
  }

  render() {
    const { name, username, password, error, confirmPassword } = this.state
    return (
      <div className='signup-form-div'>
        {error ?
          <span className='error-movie-card'>{error}</span>
          : null
        }
        <form className='signup-form' onSubmit={this.handleSubmit}>
          <div className='signup-inner-div'>
            <label className='signup-label' htmlFor='signup-name'>Name</label>
            <input id='signup-name' className='signup-input' name='name' value={name} onChange={this.handleChange} />
          </div>
          <div className='signup-inner-div'>
            <label className='signup-label' htmlFor='signup-email'>Email</label>
            <input id='signup-email' className='signup-input' name='username' value={username} onChange={this.handleChange} type='email'/>
          </div>
          <div className='signup-inner-div'>
            <label className='signup-label' htmlFor='signup-password'>Password</label>
            <input id='signup-password' className='signup-input' name='password' value={password} onChange={this.handleChange} type='password' />
          </div>
          <div className='signup-inner-div'>
            <label htmlFor='signup-password-confirm' className='signup-label'>Confirm Password</label>
            <input id='signup-password-confirm' className='signup-input' name='confirmPassword' value={confirmPassword} onChange={this.handleChange} type='password' />
          </div>
          <button className='signup-submit'>Submit</button>
          <p className='login-message'>Already have an account? <Link to={`/login`}>Login!</Link></p>
        </form>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  dispatchSetCurrentUser: (name, userID) => dispatch(setCurrentUser(name, userID)),
})

export default connect(null, mapDispatchToProps)(SignUp)

SignUp.propTypes = {
  dispatchSetCurrentUser: PropTypes.func,
}
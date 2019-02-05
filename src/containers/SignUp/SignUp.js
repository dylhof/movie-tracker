import React, { Component } from 'react';
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
      password: ''
    }
  }

  handleChange = (event) => {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    } else if (event.target.name === 'password') {
      this.setState({ password: event.target.value })
    } else {
      this.setState({ name: event.target.value })
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
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
      this.setState({ name: '', username: '', password: '' })
    } catch (error) {
      if (error.message === '500') {
        this.setState({ error: 'This email already exists!' })
      }
    }
  }

  render() {
    return (
      <div className='signup-form-div'>
        <form className='signup-form' onSubmit={this.handleSubmit}>
          <div className='signup-inner-div'>
            <label className='signup-label' for='signup-name'>Name</label>
            <input id='signup-name' className='signup-input' name='name' value={this.state.name} onChange={this.handleChange} />
          </div>
          <div className='signup-inner-div'>
            <label className='signup-label' for='signup-email'>Email</label>
            <input id='signup-email' className='signup-input' name='username' value={this.state.username} onChange={this.handleChange} />
          </div>
          <div className='signup-inner-div'>
            <label className='signup-label' for='signup-password'>Password</label>
            <input id='signup-password' className='signup-input' name='password' value={this.state.password} onChange={this.handleChange} />
          </div>
          <button className='signup-submit'>Submit</button>
          <span>{this.state.error}</span>
        </form>

      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  dispatchSetCurrentUser: (name, userID) => dispatch(setCurrentUser(name, userID))
})

export default connect(null, mapDispatchToProps)(SignUp)

SignUp.propTypes = {
  dispatchSetCurrentUser: PropTypes.func
}
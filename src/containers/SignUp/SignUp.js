import React, { Component } from 'react';
import { fetchPost } from '../../helper/apiCall';
import { connect } from 'react-redux';
import { setCurrentUser, setError } from '../../actions';
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
    const {name, value} = event.target
    this.setState({[name]: value})
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
      this.props.dispatchSetError('')
      this.setState({ name: '', username: '', password: '' })
    } catch (error) {
      this.props.dispatchSetError('This email already exists!')
    }
  }

  render() {
    const { error } = this.props
    const { name, username, password } = this.state
    return (
      <div className='signup-form-div'>
        <form className='signup-form' onSubmit={this.handleSubmit}>
          <div className='signup-inner-div'>{error}</div>
          <div className='signup-inner-div'>
            <label className='signup-label' htmlFor='signup-name'>Name</label>
            <input id='signup-name' className='signup-input' name='name' value={name} onChange={this.handleChange} />
          </div>
          <div className='signup-inner-div'>
            <label className='signup-label' htmlFor='signup-email'>Email</label>
            <input id='signup-email' className='signup-input' name='username' value={username} onChange={this.handleChange} />
          </div>
          <div className='signup-inner-div'>
            <label className='signup-label' htmlFor='signup-password'>Password</label>
            <input id='signup-password' className='signup-input' name='password' value={password} onChange={this.handleChange} />
          </div>
          <button className='signup-submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  dispatchSetCurrentUser: (name, userID) => dispatch(setCurrentUser(name, userID)),
  dispatchSetError: (message) => dispatch(setError(message))
})

export default connect(null, mapDispatchToProps)(SignUp)

SignUp.propTypes = {
  dispatchSetCurrentUser: PropTypes.func,
  dispatchSetError: PropTypes.func
}
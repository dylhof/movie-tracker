import React, { Component } from 'react';
import { fetchPost } from '../../helper/apiCall';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../actions';

export class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      username: '',
      password: '',
      error: ''
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

  //   sign in   /api/users
  // Create Account - /api/users / new
  //   Add Favorite - /api/users / favorites / new
  //   Receive All Favorites - /api/users /: user_id / favorites
  // Delete a Favorite - /api/users /: user_id / favorites /: movie_id

  handleSubmit = async (event) => {
    event.preventDefault();
    let allUsers
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
      this.setState({name: '', username: '', password: ''})
    } catch (error) {
      console.log(error.message)
      if (error.message === '500') {
        this.setState({ error: 'This email already exists!' })
      }
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name='name' value={this.state.name} onChange={this.handleChange} />
        <input name='username' value={this.state.username} onChange={this.handleChange} />
        <input name='password' value={this.state.password} onChange={this.handleChange} />
        <button>Submit</button>
        <span>{this.state.error}</span>
      </form>
    )
  }


}

export const mapDispatchToProps = (dispatch) => ({
  dispatchSetCurrentUser: (name, id) => dispatch(setCurrentUser(name, id))
})

export default connect(null, mapDispatchToProps)(SignUp)
// SignUp form:
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
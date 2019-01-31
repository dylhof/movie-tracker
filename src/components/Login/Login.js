import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
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
    const url = 'http://localhost:3000/api/users/new'
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ name: 'Matt', email: this.state.username, password: this.state.password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()
    }
    catch (error) {
      throw Error(`There was an error: ${Error.status}`)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name='username' value={this.state.username} onChange={this.handleChange} />
        <input name='password' value={this.state.password} onChange={this.handleChange} />
        <button>Submit</button>
      </form>
    )
  }


}

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
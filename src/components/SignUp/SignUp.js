import React, { Component } from 'react';

export default class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      username: '',
      password: '',
      userFound: ''
    }
  }
  handleChange = (event) => {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    } else if (event.target.password) {
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
      const response = await fetch('http://localhost:3000/api/users')
      if (response.ok) {
        const result = await response.json()
        allUsers = result.data
      } else {
        throw Error(`There was an error: ${Error.status}`)
      }
    } catch (error) {

    }

    let foundUser = allUsers.find(user => {
      return user.email === this.state.username
    })

    if (foundUser) {
      this.setState({ userFound: 'User exists' })
    } else {



      const url = 'http://localhost:3000/api/users/new'
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ name: this.state.name, email: this.state.username, password: this.state.password }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const result = await response.json()
        debugger
      }
      catch (error) {
        throw Error(`There was an error: ${Error.status}`)
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
        <span>{this.state.userFound}</span>
      </form>
    )
  }


}

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
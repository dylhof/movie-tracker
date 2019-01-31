import React, { Component } from 'react';

export default class Login extends Component{
  constructor() {
    super() 
    this.state = {
      username: '',
      password: '',
    }
  }
  handleChange = (event) => {
    if(event.target.name === 'username') {
      this.setState({ username: event.target.value })
    } else {
      this.setState({ password: event.target.value })
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:3000/api/users'
    try {
      const response = await fetch(url)
      if(response.ok) {
        const result = await response.json()
        console.log(result.data)
      } else { throw Error(response.status)}
    } catch (error) {
      // console.log(error)
      // throw Error(`There was an error: ${Error.status}`)
    }
    this.setState({ username: '', password: '' })
  }
  
  render() {
    return (
    <form onSubmit={this.handleSubmit}>
      <input name='username' value={this.state.username} onChange={this.handleChange}/>
      <input name='password' value={this.state.password} onChange={this.handleChange}/>
      <button>Submit</button>
    </form>
  )}

  
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
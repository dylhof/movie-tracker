import React, { Component } from 'react';

export class Login extends Component{
  constructor() {
    super() 
    this.state = {
      username = '',
      password = '',
    }
  }
  handleChange = (event) => {
    if(event.target.name === 'username') {
      this.setState({ username: event.target.value })
    } else {
      this.setState({ password: event.target.value })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

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
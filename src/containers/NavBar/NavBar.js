import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { logoutCurrentUser } from '../../actions';

class NavBar extends Component {
  // constructor() {
  //   super()
  // }

  handleLogoutClick = () =>{
    this.props.dispatchLogoutUser()
  }
  render() {
    return (
      <div className="NavBar">
        <NavLink exact to="/">Home</NavLink>
        <NavLink exact to={(this.props.currentUser) ? '/Favorites' : '/Login'}>
          Favorites
      </NavLink>
        {
          this.props.currentUser ?
            <button onClick={this.handleLogoutClick}>Logout</button>
            :
            <div>
              <NavLink exact to='/Login'>Login</NavLink>
              <NavLink exact to='/SignUp'>Sign up</NavLink>
            </div>
        }
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  dispatchLogoutUser: () => dispatch(logoutCurrentUser())
})

export const mapStateToProps = (state) => ({
  currentUser: state.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
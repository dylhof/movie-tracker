import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { logoutCurrentUser, clearFavorites } from '../../actions';

class NavBar extends Component {
  // constructor() {
  //   super()
  // }

  handleLogoutClick = () =>{
    this.props.dispatchLogoutUser()
    this.props.dispatchClearFavorites()
  }
  render() {
    return (
      <div className="NavBar">
        <NavLink exact to="/">Home</NavLink>
        <NavLink exact to={(this.props.currentUser) ? '/favorites' : '/login'}>
          Favorites
      </NavLink>
        {
          this.props.currentUser ?
            <button onClick={this.handleLogoutClick}>Logout</button>
            :
            <div>
              <NavLink exact to='/login'>Login</NavLink>
              <NavLink exact to='/signUp'>Sign up</NavLink>
            </div>
        }
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  dispatchLogoutUser: () => dispatch(logoutCurrentUser()),
  dispatchClearFavorites: () => dispatch(clearFavorites())
})

export const mapStateToProps = (state) => ({
  currentUser: state.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
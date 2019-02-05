import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { logoutCurrentUser, clearFavorites } from '../../actions';
import PropTypes from 'prop-types'

export class NavBar extends Component {

  handleLogoutClick = () => {
    this.props.dispatchLogoutUser()
    this.props.dispatchClearFavorites()
  }

  render() {
    return (
      <div className="NavBar">
        <NavLink className='nav-link' exact to="/"><div className="home-btn">Movie Tracker</div></NavLink>
        <div className="small-btns">
          <NavLink className='nav-link' exact to={(this.props.currentUser) ? '/favorites' : '/login'}>
            <div className="favorites-btn">Favorites</div>
          </NavLink>
          {
            this.props.currentUser ?
              <div className='logout-btn' onClick={this.handleLogoutClick}>Logout</div>
              :
              <div className="signup-login-btns">
                <NavLink className='nav-link' exact to='/login'><div className="login-btn">Login</div></NavLink>
                <NavLink className='nav-link' exact to='/signUp'><div className="signup-btn">Sign up</div></NavLink>
              </div>
          }
        </div>
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

NavBar.propTypes = {
  dispatchLogoutUser: PropTypes.func,
  dispatchClearFavorites: PropTypes.func,
  currentUser: PropTypes.object
}
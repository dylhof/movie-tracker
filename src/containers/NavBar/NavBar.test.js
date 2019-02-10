import React from 'react'
import { shallow } from 'enzyme'
import { NavBar, mapDispatchToProps, mapStateToProps } from './NavBar';
import * as actions from '../../actions/index'

describe('NavBar', () => {
  let wrapper
  beforeEach(() => {
    const mockDispatchLogoutUser = jest.fn()
    const mockDispatchClearFavorites = jest.fn()
    const mockCurrentUser = {name: 'Dylan', id: 1}
    const mockFavorites = [1, 3, 5]
    wrapper = shallow(
      <NavBar 
        dispatchLogoutUser={mockDispatchLogoutUser}
        dispatchClearFavorites={mockDispatchClearFavorites}
        currentUser={mockCurrentUser}
        favorites={mockFavorites}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot with no current user', () => {
    wrapper = shallow(
      <NavBar currentUser={{}} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleLogoutClick', () => {
    it('should call dispatchLogoutUser and dispatchClearFavorites', () => {
      //execution
      wrapper.instance().handleLogoutClick()
      //expectation
      expect(wrapper.instance().props.dispatchLogoutUser).toHaveBeenCalled()
      expect(wrapper.instance().props.dispatchClearFavorites).toHaveBeenCalled()
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch when using dispatchLogoutUser from MDTP', () => {
      //setup
      const mockDispatch = jest.fn()
      const actionToDispatch = actions.logoutCurrentUser()
      //execution
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.dispatchLogoutUser()
      //expectation
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should call dispatch when using dispatchClearFavorites from MDTP', () => {
      //setup
      const mockDispatch = jest.fn()
      const actionToDispatch = actions.clearFavorites()
      //execution
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.dispatchClearFavorites()
      //expectation
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })

  describe('mapStateToProps', () => {
    it('should return an object with a current user and favorites', () => {
      //setup
      const mockState = {currentUser: {name: 'Matt'}, favorites: [1, 3, 5], movies: [{}]}
      const expected = {currentUser: {name: 'Matt'}, favorites: [1, 3, 5]}
      //execution
      const mappedProps = mapStateToProps(mockState)
      //expectation
      expect(mappedProps).toEqual(expected)
    })
  })

})
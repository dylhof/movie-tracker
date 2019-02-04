import React from 'react';
import { shallow } from 'enzyme';
import { MovieDetails, mapStateToProps, mapDispatchToProps } from './MovieDetails'
import * as helper from '../../helper/helpers'
import * as actions from '../../actions/index'

describe('MovieDetails', () => {
  let wrapper
  beforeEach(() => {
    let currentUser = { name: 'Matt', userID: 1 }
    let mockDispatchDeleteFavorite = jest.fn()
    let mockDispatchAddFavorite = jest.fn()
    let mockDispatchSetError = jest.fn()
    let mockFavorites = [1, 2, 3]
    wrapper = shallow(
      <MovieDetails
        currentUser={currentUser}
        dispatchDeleteFavorite={mockDispatchDeleteFavorite}
        dispatchAddFavorite={mockDispatchAddFavorite}
        dispatchSetError={mockDispatchSetError}
        favorites={mockFavorites}
      />
    )
  })

  it('should match the snapshot', () => {
    //expectation
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleFavoriteClick', () => {

    it('should call tryUnfavorite if currentUser and already favorite', () => {
      //setup
      const mockEvent = { target: { value: 'true' } }
      helper.tryUnfavorite = jest.fn()
      //execution
      wrapper.instance().handleFavoriteClick(mockEvent)
      //expectation
      expect(wrapper.instance().props.dispatchDeleteFavorite).toHaveBeenCalled()
      expect(helper.tryUnfavorite).toHaveBeenCalled()
    })

    it('should call tryFavorite if currentUser and not already favorite', () => {
      //setup 
      const mockEvent = { target: { value: 'false' } }
      helper.tryFavorite = jest.fn()
      //execution
      wrapper.instance().handleFavoriteClick(mockEvent)
      //expectation
      expect(wrapper.instance().props.dispatchAddFavorite).toHaveBeenCalled()
      expect(helper.tryFavorite).toHaveBeenCalled()
    })

    it('should set state of isUser if there is no current user', () => {
      //setup
      const mockEvent = { target: { value: 'false' } }
      let mockFavorites = [1, 2, 3]
      let currentUser = null
      wrapper = shallow(
        <MovieDetails
          currentUser={currentUser}
          favorites={mockFavorites}
        />)
      //execution
      wrapper.instance().handleFavoriteClick(mockEvent)
      //expectation
      expect(wrapper.state('isUser')).toEqual('Please login or create an acount to favorite your movies!')
    })
  })

  describe('mapStateToProps', () => {

    it('should return an object with a current user and an array of favorites', () => {
      //setup
      const mockState = {
        currentUser: [{ title: 'Aquaman' }],
        favorites: [{}],
        error: 'Error'
      }
      const expected = {
        currentUser: [{ title: 'Aquaman' }],
        favorites: [{}]
      }
      //execution
      const mappedProps = mapStateToProps(mockState)
      //expectation
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {

    it('should call dispatch when using dispatchAddFavorite from MDTP', () => {
      //setup
      const mockDispatch = jest.fn()
      const actionToDispatch = actions.addFavorite(1)
      //execution
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.dispatchAddFavorite(1)
      //expectation
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should call dispatch when using dispatchDeleteFavorite from MDTP', () => {
      //setup
      const mockDispatch = jest.fn()
      const actionToDispatch = actions.deleteFavorite(1)
      //execution
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.dispatchDeleteFavorite(1)
      //expectation
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })

})
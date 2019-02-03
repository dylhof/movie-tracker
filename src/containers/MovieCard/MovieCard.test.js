import React from 'react';
import { shallow } from 'enzyme';
import { MovieCard, mapStateToProps, mapDispatchToProps } from './MovieCard'
import * as helper from '../../helper/helpers'

describe('MovieCard', () => {
  let wrapper
  beforeEach(() => {
    let currentUser = { name: 'Matt', userID: 1 }
    let mockDispatchDeleteFavorite = jest.fn()
    let mockDispatchAddFavorite = jest.fn()
    let mockDispatchSetError = jest.fn()
    let mockFavorites = [1, 2, 3]
    wrapper = shallow(
      <MovieCard
        currentUser={currentUser}
        dispatchDeleteFavorite={mockDispatchDeleteFavorite}
        dispatchAddFavorite={mockDispatchAddFavorite}
        dispatchSetError={mockDispatchSetError}
        favorites={mockFavorites}
      />
    )
  })

  it('should match the snapshot', () => {

  })

  it('should have initial state', () => {
    //setup
    const expected = {isUser: ''}
    //expectation
    expect(wrapper.state()).toEqual(expected)
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
        <MovieCard
          currentUser={currentUser}
          favorites={mockFavorites}
        />)
      //execution
      wrapper.instance().handleFavoriteClick(mockEvent)
      //expectation
      expect(wrapper.state('isUser')).toEqual('Please login or create an acount to favorite your movies!')
    })
  })
})
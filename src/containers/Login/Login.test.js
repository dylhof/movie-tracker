import React from 'react'
import { shallow } from 'enzyme'
import { Login } from './Login'
import { mapDispatchToProps } from './Login'
import * as API from '../../helper/apiCall'
import * as actions from '../../actions/index'

describe('Login', () => {
  let wrapper
  beforeEach(() => {
    const mockDispatchAddAllUserFavorites = jest.fn()
    const mockDispatchSetCurrentUser = jest.fn()
    wrapper = shallow(
      <Login
        dispatchSetCurrentUser={mockDispatchSetCurrentUser}
        dispatchAddAllUserFavorites={mockDispatchAddAllUserFavorites}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have initial state', () => {
    //setup
    const expected = { username: '', password: '' }
    //expectation
    expect(wrapper.state()).toEqual(expected)
  })

  it('should call handleSubmit when submit button is clicked', () => {
    // const mockEvent = Object.assign(jest.fn(), {preventDefault: () => {}})
    wrapper.instance().handleSubmit = jest.fn()
   wrapper.find('form').simulate('submit')
    expect(wrapper.instance().handleSubmit).toHaveBeenCalled()
  })

  describe('handleChange', () => {
    it('should set state of username', () => {
      //setup
      const mockEvent = { target: { name: 'username', value: 'Dylan' } }
      //execution
      wrapper.instance().handleChange(mockEvent)
      //expectation
      expect(wrapper.state('username')).toEqual('Dylan')
    })

    it('should set state of password', () => {
      //setup
      const mockEvent = { target: { name: 'password', value: 'Dylan' } }
      //execution
      wrapper.instance().handleChange(mockEvent)
      //expectation
      expect(wrapper.state('password')).toEqual('Dylan')
    })
  })

  describe('handleSubmit', () => {
    let mockEvent
    beforeEach(() => {
      mockEvent = Object.assign(jest.fn(), { preventDefault: () => { } })
    })
    it('should call fetchPost', () => {
      //setup
      API.fetchPost = jest.fn()
      //execution
      wrapper.instance().handleSubmit(mockEvent)
      //expectation
      expect(API.fetchPost).toHaveBeenCalled()
    })

    it('should call dispatchSetCurrentUser with the correct params', async () => {
      //setup
      const mockResponse = { data: { name: 'Matt', id: 2 } }
      API.fetchPost = jest.fn().mockImplementation(() => Promise.resolve(mockResponse))
      //execution
      await wrapper.instance().handleSubmit(mockEvent)
      //expectation
      expect(wrapper.instance().props.dispatchSetCurrentUser).toHaveBeenCalledWith('Matt', 2)
    })

    it('should call fetchData', async () => {
      //setup
      API.fetchData = jest.fn()
      const mockResponse = { data: { name: 'Matt', id: 2 } }
      API.fetchPost = jest.fn().mockImplementation(() => Promise.resolve(mockResponse))
      //execution
      await wrapper.instance().handleSubmit(mockEvent)
      //expectation
      expect(API.fetchData).toHaveBeenCalledWith('http://localhost:3000/api/users/2/favorites')
    })

    it('should call dispatchAddAllUserFavorites with the correct params', async () => {
      //setup
      const mockResponse = { data: { name: 'Matt', id: 2 } }
      const mockFavoritesData = { data: [{ title: 'AquaMan', movie_id: 1 }, { title: 'Serenity', movie_id: 3 }] }
      API.fetchPost = jest.fn().mockImplementation(() => Promise.resolve(mockResponse))
      API.fetchData = jest.fn().mockImplementation(() => Promise.resolve(mockFavoritesData))
      //execution
      await wrapper.instance().handleSubmit(mockEvent)
      //expectation
      expect(wrapper.instance().props.dispatchAddAllUserFavorites).toHaveBeenCalledWith([1, 3])
    })
  })

  describe('mapDispatchToProps', () => {

    it('should call dispatch when calling dispatchSetCurrentUser from mdtp', () => {
      //setup
      const mockDispatch = jest.fn()
      const actionToDispatch = actions.setCurrentUser('Matt', 1)
      //execution
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.dispatchSetCurrentUser('Matt', 1)
      //expectation
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should call dispatch when calling dispatchAddAllUserFavorites from mdtp', () => {
      //setup
      const mockDispatch = jest.fn()
      const actionToDispatch = actions.addAllUserFavorites([1, 3])
      //execution
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.dispatchAddAllUserFavorites([1, 3])
      //expectation
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})
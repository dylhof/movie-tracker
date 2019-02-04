import React from 'react'
import { shallow } from 'enzyme'
import { SignUp, mapDispatchToProps } from './SignUp'
import * as API from '../../helper/apiCall'
import * as actions from '../../actions/index'

describe('SignUp', () => {
  let wrapper
  beforeEach(() => {
    const mockDispatchSetCurrentUser = jest.fn()
    wrapper = shallow(
      <SignUp
        dispatchSetCurrentUser={mockDispatchSetCurrentUser}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have initial State', () => {
    //setup
    const expected = { name: '', username: '', password: '' }
    //expectation
    expect(wrapper.state()).toEqual(expected)
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

    it('should set state of name', () => {
      //setup
      const mockEvent = { target: {name: 'name', value: 'Dylan'}}
      //execution
      wrapper.instance().handleChange(mockEvent)
      //expectation
      expect(wrapper.state('name')).toEqual('Dylan')
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
      const mockResponse = { id: 2 }
      wrapper.instance().setState({ name: 'Matt' })
      API.fetchPost = jest.fn().mockImplementation(() => Promise.resolve(mockResponse))
      //execution
      await wrapper.instance().handleSubmit(mockEvent)
      //expectation
      expect(wrapper.instance().props.dispatchSetCurrentUser).toHaveBeenCalledWith('Matt', 2)
    })

    it('should reset all state inputs to empty string', async () => {
      //setup
      wrapper.instance().setState({ name: 'Matt', username: 'Matt@matt', password: 'matt' })
      const expected = {name: '', username: '', password: ''}
      //execution
      await wrapper.instance().handleSubmit(mockEvent)
      //expectation
      expect(wrapper.state()).toEqual(expected)
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
  })
})
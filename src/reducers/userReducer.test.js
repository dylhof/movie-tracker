import { userReducer } from './userReducer'
import * as actions from '../actions'

describe('userReducer', () => {

  it('should return initial state', () => {
    //setup 
    const expected = null
    //execution
    const result = userReducer(undefined, {})
    //expectation
    expect(result).toEqual(expected)
  })

  it('set current user when user logs in', () => {
    //setup
    const initialState = null
    const expected = { name: 'Matt', userID: 1 }
    //execution
    const result = userReducer(initialState, actions.setCurrentUser('Matt', 1))
    //expectation
    expect(result).toEqual(expected)
  })

  it('set user to null when user logs out', () => {
    //setup
    const initialState = { name: 'Matt', userID: 1 }
    const expected = null
    //execution
    const result = userReducer(initialState, actions.logoutCurrentUser())
    //expectation
    expect(result).toEqual(expected)
  })
})
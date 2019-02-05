import { errorReducer } from './errorReducer'
import * as actions from '../actions'

describe('errorReducer', () => {

  it('should return initial state', () => {
    //setup 
    const expected = ''
    //execution
    const result = errorReducer(undefined, {})
    //expectation
    expect(result).toEqual(expected)
  })

  it('should set an error message', () => {
    //setup
    const initialState = ''
    const expected = { message: "Something isn't working" }
    //execution
    const result = errorReducer(initialState, actions.setError({ message: "Something isn't working" }))
    //expectation
    expect(result).toEqual(expected)
  })

})
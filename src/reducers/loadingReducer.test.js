import { loadingReducer } from './loadingReducer'
import * as actions from '../actions'

describe('loadingReducer', () => {

  it('should return initial state', () => {
    //setup 
    const expected = true
    //execution
    const result = loadingReducer(undefined, {})
    //expectation
    expect(result).toEqual(expected)
  })

  it('should set loading to false', () => {
    //setup
    const initialState = true
    const expected = false
    //execution
    const result = loadingReducer(initialState, actions.setLoading(false))
    //expectation
    expect(result).toEqual(expected)
  })

})
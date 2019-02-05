import { favoritesReducer } from './favoritesReducer'
import * as actions from '../actions'

describe('favoritesReducer', () => {

  it('should return initial state', () => {
    //setup 
    const expected = []
    //execution
    const result = favoritesReducer(undefined, {})
    //expectation
    expect(result).toEqual(expected)
  })

  it('should add a movie to favorites', () => {
    //setup
    const initialState = []
    const expected = [1]
    //execution
    const result = favoritesReducer(initialState, actions.addFavorite(1))
    //expectation
    expect(result).toEqual(expected)
  })

  it('should delete a movie from favorites', () => {
    //setup
    const initialState = [1, 3, 5]
    const expected = [1, 5]
    //execution
    const result = favoritesReducer(initialState, actions.deleteFavorite(3))
    //expectation
    expect(result).toEqual(expected)
  })

  it('should add all user favorites', () => {
    //setup
    const initialState = []
    const expected = [1, 3, 5]
    //execution
    const result = favoritesReducer(initialState, actions.addAllUserFavorites([1, 3, 5]))
    //expectation
    expect(result).toEqual(expected)
  })

  it('should clear all favorites', () => {
    //setup
    const initialState = [1, 3, 5]
    const expected = []
    //execution
    const result = favoritesReducer(initialState, actions.clearFavorites([1, 3, 5]))
    //expectation
    expect(result).toEqual(expected)
  })
})
import * as actions from './index'

describe('action', () => {

  it('should return type of STORE_MOVIES with an array of movies', () => {
    //setup
    const movies = [{ title: 'Aquaman' }]
    const expected = { type: 'STORE_MOVIES', movies }
    //execution
    const result = actions.storeMovies(movies)
    //expectation
    expect(result).toEqual(expected)
  })

  it('should have a type of SET_USER', () => {
    //setup
    const name = 'Matt'
    const id = 1;
    const expected = { type: 'SET_USER', name: 'Matt', id: 1 }
    //execution
    const result = actions.setCurrentUser(name, id)
    //expectation
    expect(result).toEqual(expected)
  })

  it('should have a type of LOGOUT_USER', () => {
    //setup
    const expected = { type: 'LOGOUT_USER' }
    //execution
    const result = actions.logoutCurrentUser()
    //expectation
    expect(result).toEqual(expected)
  })

  it('should have a type of ADD_FAVORITE', () => {
    //setup
    const id = 1
    const expected = { type: 'ADD_FAVORITE', id: 1 }
    //execution
    const result = actions.addFavorite(id)
    //expectation
    expect(result).toEqual(expected)
  })

  it('should have a type of DELETE_FAVORITE', () => {
    //setup
    const id = 1
    const expected = { type: 'DELETE_FAVORITE', id: 1 }
    //execution
    const result = actions.deleteFavorite(id)
    //expectation
    expect(result).toEqual(expected)
  })

  it('should have a type of ADD_ALL_USER_FAVORITES', () => {
    //setup
    const favorites = [1, 3, 5]
    const expected = { type: 'ADD_ALL_USER_FAVORITES', favorites: [1, 3, 5] }
    //execution
    const result = actions.addAllUserFavorites(favorites)
    //expectation
    expect(result).toEqual(expected)
  })

  it('should have a type of CLEAR_FAVORITES', () => {
    //setup
    const expected = { type: 'CLEAR_FAVORITES' }
    //execution
    const result = actions.clearFavorites()
    //expectation
    expect(result).toEqual(expected)
  })

  it('should have a type of SET_LOADING', () => {
    //setup
    const expected = { type: 'SET_LOADING' }
    //execution
    const result = actions.setLoading()
    //expectation
    expect(result).toEqual(expected)
  })

  it('should have a type of SET_ERROR', () => {
    //setup
    const message = 'Something went wrong'
    const expected = { type: 'SET_ERROR', message: 'Something went wrong' }
    //execution
    const result = actions.setError(message)
    //expectation
    expect(result).toEqual(expected)
  })
})
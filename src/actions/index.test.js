import * as actions from './index'

describe('action', () => {
  it('should return type of STORE_MOVIES with an array of movies', () => {
    //setup
    const movies = [{title: 'Aquaman'}]
    const expected = {type: 'STORE_MOVIES', movies}
    //execution
    const result = actions.storeMovies(movies)
//expectation
    expect(result).toEqual(expected)
  })
})
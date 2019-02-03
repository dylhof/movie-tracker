import { tryFavorite, tryUnfavorite } from './helpers';
import * as API from './apiCall';

describe('helpers', () => {

  describe('tryFavorite', () => {
    it('should call fetchPost', () => {
      //setup
      API.fetchPost = jest.fn()
      //execution
      tryFavorite()
      //expectation
      expect(API.fetchPost).toHaveBeenCalled()
    })

    it('should call fetchPost with correct parameters', () => {
      //setup
      API.fetchPost = jest.fn()
      //execution
      tryFavorite('Aquaman', 1, 2, 'poster_aquaman', '2/3/2019', 3.4, 'overview')
      //expectation
      expect(API.fetchPost).toHaveBeenCalledWith('http://localhost:3000/api/users/favorites/new',
        {
          method: 'POST',
          body: JSON.stringify({
            movie_id: 1, user_id: 2, title: 'Aquaman', poster_path: 'poster_aquaman',
            release_date: '2/3/2019', vote_average: 3.4, overview: 'overview'
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
    })
  })

  describe('tryUnfavorite', () => {
    it('should call fetchPost', () => {
      //setup
      API.fetchPost = jest.fn()
      //execution
      tryFavorite()
      //expectation
      expect(API.fetchPost).toHaveBeenCalled()
    })

    it('should call fetchPost with correct parameters', () => {
      //setup
      API.fetchPost = jest.fn()
      //execution
      tryUnfavorite(1, 2)
      //expectation
      expect(API.fetchPost).toHaveBeenCalledWith('http://localhost:3000/api/users/2/favorites/1',
        {
          method: 'DELETE',
          body: JSON.stringify({
            user_id: 2, movie_id: 1
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
    })
  })
})
import React from 'react';
import Favorites from './Favorites';
import { shallow } from 'enzyme';
import { mapStateToProps } from './Favorites'

describe('Favorites', () => {
  let wrapper
  beforeEach(() => {
    let mockMovies = [{ title: 'Aquaman', id: 1 }, { title: 'Serenity', id: 2 }]
    let mockFavorites = [2]
    wrapper = shallow(<Favorites
      movies={mockMovies}
      favorites={mockFavorites}
    />)
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {

    it('should return an object with a movies array and favorites array', () => {
      //setup
      const mockState = { movies: [{}], favorites: [1], currentUser: {} }
      const expected = { movies: [{}], favorites: [1] }
      //execution
      const mappedProps = mapStateToProps(mockState)
      //expectation
      expect(mappedProps).toEqual(expected)
    })
  })

})
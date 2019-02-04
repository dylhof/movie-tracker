import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';
import { mapStateToProps } from './Home'

describe('home', () => {
  let wrapper
  beforeEach(() => {
    let mockMovies = [{title: 'Aquaman', id: 1}, {title: 'Serenity', id: 2}]
    wrapper = shallow(
      <Home movies={mockMovies} /> 
    )
  })
  
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    
    it('should return an object with a movies array', () => {
      //setup
      const mockState = {movies: [{}], favorites: [1]}
      const expected = {movies: [{}]}
      //execution
      const mappedProps = mapStateToProps(mockState)
      //expectation
      expect(mappedProps).toEqual(expected)
    })
  })
})
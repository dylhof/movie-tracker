import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { shallow } from 'enzyme'
import { mapDispatchToProps } from './App'
import * as actions from '../../actions'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { rootReducer } from '../../reducers'
import { BrowserRouter } from 'react-router-dom';
import { mapStateToProps } from '../NavBar/NavBar';
import * as api from '../../helper/apiCall'

describe('App', () => {

  const store = createStore(rootReducer)
  let wrapper

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
      , div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('mapStateToProps', () => {

    it('should return an object with a movies array', () => {
      //setup
      const mockState = {
        currentUser: [{ title: 'Aquaman' }],
        favorites: [{}]
      }
      const expected = {
        currentUser: [{ title: 'Aquaman' }]
      }
      //execution
      const mappedProps = mapStateToProps(mockState)
      //expectation
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {

    it('should call dispatch when using a function from MDTP', () => {
      //setup
      const mockDispatch = jest.fn()
      const actionToDispatch = actions.storeMovies([{}])
      //execution
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.dispatchStoreMovies([{}])
      //expectation
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })

  describe('fetchAndStoreMovies', () => {
    const mockDispatchStoreMovies = jest.fn()
    const mockDispatchSetLoading = jest.fn()
    beforeEach(() => {
      wrapper = shallow(<App
        dispatchStoreMovies={mockDispatchStoreMovies}
        dispatchSetLoading={mockDispatchSetLoading}
      />)
    })

    it('should call fetchData', () => {
      //execution
      api.fetchData = jest.fn()
      wrapper.instance().fetchAndStoreMovies()
      //expectation
      expect(api.fetchData).toHaveBeenCalled()
    })

    it('should update state with an array of movies', async () => {
      //setup
      const mockMovies = [{
        results: [
          { title: 'Aquaman' }
        ]
      }]
      api.fetchData = jest.fn().mockImplementation(() => Promise.resolve(mockMovies))
      // execution
      await wrapper.instance().fetchAndStoreMovies()
      //expectation
      expect(wrapper.instance().props.dispatchStoreMovies).toHaveBeenCalledWith(mockMovies.results)
    })
  })

})
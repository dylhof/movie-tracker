import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme'
import { mapDispatchToProps } from './App'
import * as actions from '../../actions'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { rootReducer } from '../../reducers'
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  const store = createStore(rootReducer)
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

  // it('should return an object with a movies array', () => {
  //   //setup
  //   const mockState = {
  //     movies: [{ title: 'Aquaman' }],
  //     favorites: [{}]
  //   }
  //   const expected = {
  //     movies: [{ title: 'Aquaman'}]
  //   }
  //   //execution
  //   const mappedProps = mapState
  // })
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
})
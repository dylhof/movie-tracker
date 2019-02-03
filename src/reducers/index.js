import { combineReducers } from 'redux';
import {moviesReducer} from './moviesReducer';
import {userReducer} from './userReducer';
import {favoritesReducer} from './favoritesReducer';
import {loadingReducer} from './loadingReducer';
import {errorReducer} from './errorReducer';

export const rootReducer = combineReducers({
  movies: moviesReducer,
  currentUser: userReducer,
  favorites: favoritesReducer,
  isLoading: loadingReducer,
  error: errorReducer,
}) 
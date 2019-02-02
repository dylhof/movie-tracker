import { combineReducers } from 'redux';
import {moviesReducer} from './moviesReducer';
import {userReducer} from './userReducer';
import {favoritesReducer} from './favoritesReducer';

export const rootReducer = combineReducers({
  movies: moviesReducer,
  currentUser: userReducer,
  favorites: favoritesReducer,
}) 
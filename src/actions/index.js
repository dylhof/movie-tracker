export const storeMovies = (movies) => ({
  type: 'STORE_MOVIES',
  movies
})

export const setCurrentUser = (name, id) => ({
  type: 'SET_USER',
  name,
  id
})

export const logoutCurrentUser = () => ({
  type: 'LOGOUT_USER'
})

export const addFavorite = (id) => ({
  type: 'ADD_FAVORITE',
  id
})

export const addAllUserFavorites = (favorites) => ({
  type: 'ADD_ALL_USER_FAVORITES',
  favorites
})

export const deleteFavorite = (id) => ({
  type: 'DELETE_FAVORITE',
  id
})

export const clearFavorites = () => ({
  type: 'CLEAR_FAVORITES',
})

export const setLoading = (bool) => ({
  type: 'SET_LOADING',
  bool
})
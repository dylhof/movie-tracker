//MOVIES
export const storeMovies = (movies) => ({
  type: 'STORE_MOVIES',
  movies
})

//USER
export const setCurrentUser = (name, id) => ({
  type: 'SET_USER',
  name,
  id
})

export const logoutCurrentUser = () => ({
  type: 'LOGOUT_USER'
})

//FAVORITES
export const addFavorite = (id) => ({
  type: 'ADD_FAVORITE',
  id
})

export const deleteFavorite = (id) => ({
  type: 'DELETE_FAVORITE',
  id
})

export const addAllUserFavorites = (favorites) => ({
  type: 'ADD_ALL_USER_FAVORITES',
  favorites
})

export const clearFavorites = () => ({
  type: 'CLEAR_FAVORITES',
})


//ERROR HANDLING
export const setLoading = (bool) => ({
  type: 'SET_LOADING',
  bool
})

export const setError = (message) => ({
  type: 'SET_ERROR',
  message
})
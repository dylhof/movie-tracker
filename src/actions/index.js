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

export const deleteFavorite = (id) => ({
  type: 'DELETE_FAVORITE',
  id
})
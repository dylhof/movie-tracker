export const storeMovies = (movies) => ({
  type: 'STORE_MOVIES',
  movies
})

export const setCurrentUser = (name, id) => ({
  type: 'SET_USER',
  name,
  id
})
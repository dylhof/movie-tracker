export const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.id]
    case 'DELETE_FAVORITE':
      return state.filter(id => id !== action.id)
    case 'ADD_ALL_USER_FAVORITES':
      return action.favorites
    case 'CLEAR_FAVORITES':
      return []
    default:
      return state;
  }
}
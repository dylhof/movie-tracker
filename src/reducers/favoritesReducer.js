export const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.id]
    case 'DELETE_FAVORITE':
      return state.filter(id => id !== action.id)
    default:
      return state;
  }
}
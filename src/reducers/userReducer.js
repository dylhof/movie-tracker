export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { name: action.name, userID: action.id }
    case 'LOGOUT_USER':
      return {}
    default:
      return state;
  }
}
export const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { name: action.name, userID: action.id }
    case 'LOGOUT_USER':
      return null
    default:
      return state;
  }
}
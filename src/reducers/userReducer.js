export const userReducer = (state={}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {name: 'dylan', id: action.id}
      break;
    default:
      return state;
  }
}
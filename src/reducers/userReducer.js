export const userReducer = (state=null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {name: action.name, id: action.id}
      break;
    default:
      return state;
  }
}
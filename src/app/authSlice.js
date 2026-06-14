const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
}

export const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'auth/login':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      }
    case 'auth/logout':
      return initialState
    default:
      return state
  }
}

export default authReducer

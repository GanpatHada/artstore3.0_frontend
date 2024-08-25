export const initialAuthState = {
  authType:'LOGIN',
  fullName: { value: "", error: false },
  email: { value: "", error: false },
  password: { value: "", error: false },
  confirmPassword: { value: "", error: false },
};

export default function authReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]:{...state[action.field],value:action.value},
      };

    case "SET_ERROR":
      return {
        ...state,
        [action.field]:{...state[action.field],error:action.error},
      };

    case "REMOVE_ERROR":
      return {
        ...state,
        [action.field]: {...state[action.field],error:false},
      };
    case "SET_AUTH_TYPE":
      return {
        ...state,
        authType:action.value.toUpperCase()
      } ;
    default :
      return {...state}  
    
  }
}

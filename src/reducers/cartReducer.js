export const initialSelectedCart = [];

export const selectedCartReducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED_ALL":
      return action.payload.map(item => item._id);

    case "TOGGLE_SELECT":
      return state.includes(action.payload)
        ? state.filter(id => id !== action.payload)
        : [...state, action.payload];

    case "REMOVE_SELECTED":
      return state.filter(id => id !== action.payload);

    default:
      return state;
  }
};
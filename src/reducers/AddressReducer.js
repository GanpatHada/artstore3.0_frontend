export const initialAddressState = {
  country: "",
  receiverName: "",
  mobileNumber: "",
  pinCode: "",
  address1: "",
  address2: "",
  landmark: "",
  city: "",
  state: "",
};

export const addressReducer = (state, action) => {
  switch (action.type) {
    case "SET_ADDRESS":
      return { ...state, [action.payload.type]: action.payload.value };
    case "RESET_ADDRESS":
      return { ...initialAddressState };
    default : return {...state}  
  }
};

const initialState = {
  userName: "",
  email: "",
  address:[{
    country: "",
    name: "",
    mobileNumber: "",
    pinCode: "",
    address1: "",
    address2: "",
    landmark: "",
    city: "",
    state: "",
  }],
};

const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'ADD_ADDRESS':
            return {...state,address:action.payload}

        default : return {...state}

    }
}

export default userReducer;

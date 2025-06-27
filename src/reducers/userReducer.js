import {
  editAddressHandler,
  makeAddressPrimayHandler,
} from "../utils/AddressHelper";

export const initialState = {
  user: null,
  userLoading: true,
};
const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload,userLoading:false};
    case "ADD_ADDRESS":
      return {
        ...state,
        user: {
          ...state.user,
          addresses: [...state.user.addresses, action.payload],
        },
      };
    case "EDIT_ADDRESS":
      return {
        ...state,
        user: {
          ...state.user,
          addresses: editAddressHandler(state.user.addresses, action.payload),
        },
      };
    case "DELETE_ADDRESS":
      return {
        ...state,
        user: {
          ...state.user,
          addresses: state.user.addresses.filter(
            (address) => address._id.toString() !== action.payload.toString()
          ),
        },
      };
    case "MAKE_ADDRESS_PRIMARY":
      return {
        ...state,
        user: {
          ...state.user,
          addresses: makeAddressPrimayHandler(
            state.user.addresses,
            action.payload
          ),
        },
      };
    case "START_USER_LOADING":
      return { ...state, userLoading: true };
    case "STOP_USER_LOADING":
      return { ...state, userLoading: false };
    case "ADD_TO_CART":
      return {
        ...state,
        user: {
          ...state.user,
          cart: [...state.user.cart, { product: action.payload, quantity: 1 }],
        },
      };
    case "INCREMENT_TO_CART_ITEM": {
      const updatedCart = state.user.cart.map((item) =>
        item.product === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        ...state,
        user: {
          ...state.user,
          cart: updatedCart,
        },
      };
    }

    case "DECREMENT_TO_CART_ITEM": {
      const updatedCart = state.user.cart
        .map((item) =>
          item.product === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // remove item if quantity is 0

      return {
        ...state,
        user: {
          ...state.user,
          cart: updatedCart,
        },
      };
    }
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        user: {
          ...state.user,
          wishlist: [...state.user.wishlist, action.payload],
        },
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        user: {
          ...state.user,
          cart: state.user.cart.filter(
            (product) =>
              product.product.toString() !== action.payload.toString()
          ),
        },
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        user: {
          ...state.user,
          wishlist: state.user.wishlist.filter(
            (prodId) => prodId.toString() !== action.payload.toString()
          ),
        },
      };
    default:
      return { ...state };
  }
};

export default userReducer;

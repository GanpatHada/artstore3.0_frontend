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
      return { ...state, user: action.payload, userLoading: false };
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

    case "ADD_WISHLIST":
      return {
        ...state,
        user: {
          ...state.user,
          wishlists: [...state.user.wishlists, action.payload],
        },
      };

    case "DELETE_WISHLIST":
      return {
        ...state,
        user: {
          ...state.user,
          wishlists: state.user.wishlists.filter(
            (wishlist) => wishlist._id !== action.payload
          ),
        },
      };

    case "ADD_TO_WISHLIST":
      return {
        ...state,
        user: {
          ...state.user,
          wishlists: state.user.wishlists.map((wishlist) => {
            if (wishlist._id === action.payload.wishlistId)
              return {
                ...wishlist,
                items: [...wishlist.items, action.payload.item],
              };
            return wishlist;
          }),
        },
      };

    case "MOVE_TO_WISHLIST": {
      const { productId, sourceWishlistId, targetWishlistId } = action.payload;
      const itemToMove = state.user.wishlists
        .find((w) => w._id === sourceWishlistId)
        ?.items.find((item) => item.product === productId);

      if (!itemToMove) return state;

      return {
        ...state,
        user: {
          ...state.user,
          wishlists: state.user.wishlists.map((wishlist) => {
            if (wishlist._id === sourceWishlistId) {
              return {
                ...wishlist,
                items: wishlist.items.filter(
                  (item) => item.product !== productId
                ),
              };
            }
            if (wishlist._id === targetWishlistId) {
              return {
                ...wishlist,
                items: [...wishlist.items, itemToMove],
              };
            }

            return wishlist;
          }),
        },
      };
    }

    case "DELETE_FROM_WISHLIST": {
      const { wishlistId, productId } = action.payload;

      return {
        ...state,
        user: {
          ...state.user,
          wishlists: state.user.wishlists.map((wishlist) => {
            if (wishlist._id === wishlistId) {
              return {
                ...wishlist,
                items: wishlist.items.filter(
                  (item) => item.product !== productId
                ),
              };
            }
            return wishlist;
          }),
        },
      };
    }

    case "ADD_NOTE_TO_WISHLIST_ITEM": {
  const { wishlistId, productId, note } = action.payload;

  return {
    ...state,
    user: {
      ...state.user,
      wishlists: state.user.wishlists.map((wishlist) => {
        if (wishlist._id === wishlistId) {
          return {
            ...wishlist,
            items: wishlist.items.map((item) => {
              if (item.product === productId) {
                return {
                  ...item,
                  note: { ...note } // Overwrite or add note
                };
              }
              return item;
            }),
          };
        }
        return wishlist;
      }),
    },
  };
}

case "DELETE_NOTE_FROM_WISHLIST_ITEM": {
  const { wishlistId, productId } = action.payload;

  return {
    ...state,
    user: {
      ...state.user,
      wishlists: state.user.wishlists.map((wishlist) => {
        if (wishlist._id === wishlistId) {
          return {
            ...wishlist,
            items: wishlist.items.map((item) => {
              if (item.product === productId) {
                return {
                  ...item,
                  note: null // Remove the note
                };
              }
              return item;
            }),
          };
        }
        return wishlist;
      }),
    },
  };
}


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

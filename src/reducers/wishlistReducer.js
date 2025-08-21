export const initialWishlistState = {
    view: 'ROW',
    activeList: null,
    activeModal: null,
}

export default function wishlistReducer(state, action) {
    switch (action.type) {
        case 'SET_ACTIVE_LIST':
            return { ...state, activeList: action.payload }

        case 'TOGGLE_VIEW':
            return { ...state, view: state.view === 'ROW' ? 'GRID' : 'ROW' }

        case "OPEN_MODAL":
            return { ...state,activeModal: action.payload };

        case "CLOSE_MODAL":
            return { ...state,activeModal: null };

        default:
            return state;
    }
}
import {
    OPEN_MODAL,
    CLOSE_MODAL
} from './constants';

const initialState = {
    list: []
};

function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case OPEN_MODAL: {
            return {
                ...state,
                list: [...state.list, { ...payload }]
            }
        }
        case CLOSE_MODAL: {
            const list = payload.id
                ? state.list.filter(entry => entry.id !== payload.id)
                : state.list.slice(0, -1);
            return {
                ...state,
                list
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;

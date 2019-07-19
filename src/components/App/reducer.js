import { CHANGE_OPTION } from './constants';

import { sortingType, sortingDir } from 'config.json';

const initialState = {
    sortingType,
    sortingDir
};

function reducer(state = initialState, action) {
    const { type, payload } = action;
    if (type === CHANGE_OPTION) {
        return {
            ...state,
            [payload.key]: payload.value
        };
    }
    return state;
}

export default reducer;

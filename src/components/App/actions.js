import {
    CHANGE_OPTION
} from './constants';

export {
    changeOption
};
  
function changeOption(key, value) {
    return {
        type: CHANGE_OPTION,
        payload: { key, value }
    };
}
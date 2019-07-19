import {
    OPEN_MODAL,
    CLOSE_MODAL
} from './constants';

export {
    openModal,
    closeModal
};

function openModal(id, component, isInstanciated) {
    return {
        type: OPEN_MODAL,
        payload: {
            id,
            component,
            isInstanciated
        }
    };
}

function closeModal(id) {
    return {
        type: CLOSE_MODAL,
        payload: {
            id
        }
    };
}

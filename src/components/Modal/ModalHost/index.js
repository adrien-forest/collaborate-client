import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closeModal } from 'components/Modal/actions';

ModalHost.propTypes = {
    modals: PropTypes.arrayOf(
        PropTypes.shape({
            component: PropTypes.object.isRequired,
            id: PropTypes.string.isRequired,
            isInstanciated: PropTypes.bool
        }).isRequired
    ),
    closeModalAction: PropTypes.func.isRequired
};

function ModalHost({ modals, closeModalAction }) {

    const handleOnClose = id => () => closeModalAction(id);

    const modalElts = modals.map(({ component: Component, id, isInstanciated }) => {
        return isInstanciated
            ? React.cloneElement(Component, { key: id, onClose: handleOnClose(id) })
            : <Component key={id} onClose={handleOnClose(id)} />;
    });

    return modalElts || null;
}

const mapStateToProps = state => ({
    modals: state.modal.list
});

const mapDispatchToProps = dispatch => ({
    closeModalAction: id => dispatch(closeModal(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalHost);

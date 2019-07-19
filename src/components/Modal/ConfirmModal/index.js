import React from 'react';
import PropTypes from 'prop-types';

import { ModalContainer, Form } from 'components';

ConfirmModal.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    onClose: PropTypes.func
};

function ConfirmModal({
    title,
    message,
    onConfirm,
    onCancel,
    onClose
}) {
    const onSubmit = evt => {
        evt.preventDefault();
        onClose();
        onConfirm();
    };
    const onReset = () => {
        onClose();
        onCancel && onCancel();
    };
    return (
        <ModalContainer onClose={onReset}>
            <Form onSubmit={onSubmit}>
                {title && <h2>{title}</h2>}
                {message && <div>{message}</div>}
                <div>
                    <input type='submit' value='Yes' />
                    <input type='reset' value='No' onClick={onReset} />
                </div>
            </Form>
        </ModalContainer>
    );
}

export default ConfirmModal;

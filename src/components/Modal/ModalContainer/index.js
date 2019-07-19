import React from 'react';
import PropTypes from 'prop-types';

import styles from './ModalContainer.module.css';

ModalContainer.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};

function ModalContainer({ children, onClose }) {
    return (
        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <div>{children}</div>
                <button className={styles.close} onClick={onClose}>
                    <span>×</span>
                </button>
            </div>
        </div>
    );
}

export default ModalContainer;

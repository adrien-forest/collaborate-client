import React from 'react';
import PropTypes from 'prop-types';

import styles from './Form.module.css';

Form.propTypes = {
    onSubmit: PropTypes.func,
    children: PropTypes.node
};

function Form({ onSubmit, children }) {
    return (
        <form onSubmit={onSubmit} className={styles.form}>
            {children}
        </form>
    );
}

export default Form;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Hamburger.module.css';

Hamburger.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    show: PropTypes.bool
};

function Hamburger({ className, onChange, show }) {
    const [enabled, setEnabled] = useState(show);
    useEffect(() => setEnabled(show), [show]);

    const changeEnabled = val => {
        onChange && onChange(val);
        setEnabled(val);
    };
    
    const handleClick = () => changeEnabled(!enabled);

    return (
        <div
            className={cn(className, styles.container, { [styles.enabled]: enabled })}
            onClick={handleClick}
        >
            <div className={styles.barA}></div>
            <div className={styles.barB}></div>
            <div className={styles.barC}></div>
        </div>
    );
}

export default Hamburger;

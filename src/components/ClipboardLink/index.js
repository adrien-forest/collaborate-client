import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './ClipboardLink.module.css';

ClipboardLink.propTypes = {
    label: PropTypes.string,
    link: PropTypes.string.isRequired,
    className: PropTypes.string,
};

function ClipboardLink({ label, link, className }) {

    const lnk = useRef();
    const checkbox = useRef();
    let timeout;
    
    const handleClick = () => {
        lnk.current.select();
        document.execCommand('copy');
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (checkbox.current) checkbox.current.checked = false;
        }, 3000);
    }

    return (
        <div className={className}>
            {label && <div className={styles.label}>{label}</div>}
            <label className={styles.tooltip}>
                {link}
                <input
                    type='checkbox'
                    ref={checkbox}
                    onClick={handleClick}
                />
                <span>Link copied!</span>
            </label>
            <input className={styles.hidden} defaultValue={link} ref={lnk} />
        </div>
    );
}

export default ClipboardLink;

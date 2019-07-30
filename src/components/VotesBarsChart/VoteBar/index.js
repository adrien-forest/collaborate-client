import React from 'react';
import PropTypes from 'prop-types';

import styles from './VoteBar.module.css';

VoteBar.propTypes = {
    card: PropTypes.string,
    count: PropTypes.number.isRequired,
    totalVotes: PropTypes.number.isRequired,
    color: PropTypes.arrayOf(PropTypes.number).isRequired
};

function VoteBar({ card, count, totalVotes, color }) {
    const percent = totalVotes ? count * 100 / totalVotes : 0;
    const [r, g, b] = color;
    return (
        <div className={styles.container}>
            <div className={styles.card}>{card}</div>
            <div className={styles.wrapper}>
                <div
                    data-test='bar'
                    className={styles.bar}
                    style={{
                        width: `${percent}%`,
                        height: '100%'
                    }}
                    title={`${count} votes`}
                >
                    <div
                        className={styles.fill}
                        style={{ backgroundColor: `rgb(${r},${g},${b})` }}
                    />
                </div>
            </div>
            <div className={styles.votes}>{`${count} (${percent.toFixed(1)}%)`}</div>
        </div>
    );
}

export default VoteBar;

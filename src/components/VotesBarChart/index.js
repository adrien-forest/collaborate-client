import React from 'react';
import PropTypes from 'prop-types';

import config from 'config.json';
import styles from './VotesBarChart.module.css';

VotesBarChart.propTypes = {
    poll: PropTypes.shape({
        votes: PropTypes.arrayOf(
            PropTypes.shape({
                card: PropTypes.string,
                count: PropTypes.number
            }).isRequired
        ).isRequired
    })
};

function VotesBarChart({ poll }) {
    const { votes, votesCount } = poll;
    const palette = config.palette;

    let memo = { idx: 0 };
    const elts = votes.map(({ card, count }, idx) => {
        const percent = count * 100 / votesCount;
        let color;
        if (memo.count === count) {
            color = memo.color;
            memo.idx++;
        } else {
            color = palette[(idx - memo.idx) % palette.length];
        }
        memo = { count, color, idx: memo.idx };

        return (
            <div
                key={idx}
                className={styles.value}
                style={{ width: `${percent}%` }}
            >
                <div
                    title={`Card ‘${card}‘ - ${count} votes (${percent.toFixed(1)}%)`}
                    className={styles.fill}
                    style={{backgroundColor: `rgb(${color.join(',')})`}}
                >
                    {card}
                </div>
            </div>
        );
    });


    return (
        <div className={styles.wrapper}>
            {votes.length > 0 ? (
                <>{elts}</>
            ) : (
                <div className={styles.noVotes}>No votes yet</div>
            )}
        </div>
    );
}

export default VotesBarChart;

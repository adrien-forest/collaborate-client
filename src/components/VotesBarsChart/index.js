import React from 'react';
import PropTypes from 'prop-types';

import VoteBar from './VoteBar';
import { api } from 'utils';

import { palette } from 'config.json';
import styles from './VotesBarsChart.module.css';

VotesBarsChart.propTypes = {
    user: PropTypes.object,
    poll: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        votesCount: PropTypes.number.isRequired,
        voted: PropTypes.string,
        votes: PropTypes.arrayOf(PropTypes.shape({
            card: PropTypes.string,
            count: PropTypes.number
        }).isRequired).isRequired
    }).isRequired,
    order: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

function VotesBarsChart({ user, poll, order }) {
    const { _id, votesCount, voted, votes, protection } = poll;
    const canVote = protection !== 'AUTHENTICATED' || user;

    const handleVote = newCard => async () => await api.votePoll(_id, newCard);

    let memo = { idx: 0 };
    const mapping = votes.reduce((acc, { card, count }, index) => {
        let colorIdx;
        if (memo.count === count) {
            colorIdx = memo.colorIdx;
            memo.idx++;
        } else {
            colorIdx = index - memo.idx;
        }
        memo = { count, colorIdx, idx: memo.idx };

        acc[card] = { count, colorIdx };
        return acc;
    }, {});

    const bars = order.map(card => {
        const { count, colorIdx } = mapping[card]
            ? mapping[card]
            : { count: 0, colorIdx: votes.length - memo.idx };
        const color = palette[colorIdx % palette.length];

        return (
            <div data-test='bar' key={card} className={styles.barWrapper}>
                <VoteBar key={card} card={card} count={count} totalVotes={votesCount} color={color} />
                {canVote && voted === card && (
                    <div className={styles.voted}>Voted</div>
                )}
                {canVote && voted !== card && (
                    <div data-test='vote' className={styles.vote} onClick={handleVote(card)}>Vote</div>
                )}
            </div>
        ); 
    });

    return (
        <div className={styles.chart}>
            {bars}
        </div>
    );
}

export default VotesBarsChart;

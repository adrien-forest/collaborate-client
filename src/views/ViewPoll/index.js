import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
    VotesBarsChart,
    VotesPieChart,
    ConfirmModal,
    ErrorMessage,
    PollDetails
} from 'components';
import { api, batchUpdates } from 'utils';
import { usePollsSocket } from 'hooks';
import { openModal } from 'components/Modal/actions';

import styles from './ViewPoll.module.css';

function prepareVotes({ votes, deck }) {
    const cards = {};
    const pVotes = votes.map(({ card, count }) => {
        cards[card] = count;
        return { card, count };
    });
    deck.forEach(card => !cards[card] && pVotes.push({ card, count: 0 }));
    return pVotes;
}

ViewPoll.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    user: PropTypes.object,
    openConfirm: PropTypes.func.isRequired,
    history: PropTypes.shape({
        replace: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired
    }).isRequired
};

function ViewPoll({
    match: { params: { id } },
    user,
    openConfirm,
    history
}) {
    
    const [poll, setPoll] = useState({});
    const [error, setError] = useState();
    const [order, setOrder] = useState();
    useEffect(() => {
        const doFetch = async () => {
            try {
                const data = await api.getPoll(id);
                batchUpdates(() => {
                    setPoll(data);
                    setOrder(prepareVotes(data).map(({ card }) => card));
                });
            } catch (err) { setError(err); }
        }
        doFetch();
    }, [id, user]);

    usePollsSocket('poll' + id, useCallback(({ type, data }) => {
        if (type === 'updated') {
            setPoll(data)
        } else if (type === 'deleted') {
            history.replace('/');
        }
    }, [history]));

    const handleDelete = () => {
        const doDelete = async () => {
            await api.deletePoll(id);
            history.replace('/');
        };
        openConfirm(
            <ConfirmModal
                title={'Delete Poll'}
                message={'Are you sure you want to delete this poll?'}
                onConfirm={doDelete}
            />
        );
    };

    return (
        <>
            <h2>Poll votes</h2>
            {poll._id && (
                <div className={styles.results}>
                    <div className={styles.container}>
                        <PollDetails user={user} poll={poll} onDelete={handleDelete} />
                        <VotesBarsChart user={user} poll={poll} order={order} />
                    </div>
                    <VotesPieChart poll={poll} className={styles.pie} />
                </div>
            )}
            {error && <ErrorMessage error={error} />}
            <button className={styles.back} onClick={history.goBack}>← Go Back</button>
        </>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    openConfirm: comp => dispatch(openModal('confirm', comp, true))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPoll);

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { VotesBarChart, ErrorMessage } from 'components';
import { usePollsSocket } from 'hooks';
import { api } from 'utils';
import { changeOption } from 'components/App/actions';

import styles from './ListPolls.module.css';
import { sortingTypeOpts, sortingDirOpts } from 'config.json';

ListPolls.propTypes = {
    sortingDir: PropTypes.string.isRequired,
    sortingType: PropTypes.string.isRequired,
    setSortingDir: PropTypes.func.isRequired,
    setSortingType: PropTypes.func.isRequired
};

function ListPolls({ sortingDir, sortingType, setSortingDir, setSortingType }) {

    const [error, setError] = useState();
    const [polls, setPolls] = useState();
    useEffect(() => {
        api.getPolls().then(setPolls).catch(setError);
    }, []);

    usePollsSocket('polls', useCallback(({ type, data }) => {
        if (type === 'deleted') {
            setPolls(polls => polls.filter(entry => entry._id !== data));
        }
        else if (type === 'created') {
            setPolls(polls => [...polls, data]);
        }
        else if (type === 'updated') {
            setPolls(polls => polls.map(poll => poll._id === data._id ? data : poll));
        }
    }, []));

    const sortedPolls = useMemo(() => {
        if (!polls) return [];

        return polls.sort((a, b) => {
            [a, b] = (sortingDir === 'asc') ? [a, b] : [b, a];
            if (sortingType === 'date') {
                return a.createdAt - b.createdAt;
            }
            return a.votesCount - b.votesCount;
        });
    }, [polls, sortingDir, sortingType]);

    const pollElts = sortedPolls.map(poll => (
        <Link to={`/poll/${poll._id}`} key={poll._id} className={styles.link}>
            <div className={styles.poll}>
                <div className={styles.pollTitle}>
                    {poll.title} |<span>{poll.votesCount} votes</span>
                </div>
                <VotesBarChart poll={poll} />
            </div>
        </Link>
    ));

    const handleTypeChange = evt => setSortingType(evt.target.value);
    const handleDirChange = evt => setSortingDir(evt.target.value);

    return (
        <>
            <h2>Tasks Polls</h2>
            <div className={styles.sorting}>
                <label htmlFor='sort'>Sort by</label>
                <select data-test='sortType' className={styles.select} in='sort' onChange={handleTypeChange} defaultValue={sortingType}>
                    {sortingTypeOpts.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.text}</option>
                    ))}
                </select>
                <select data-test='sortDir' className={styles.select} onChange={handleDirChange} defaultValue={sortingDir}>
                    {sortingDirOpts.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.text}</option>
                    ))}
                </select>
            </div>
            <div>
                {polls && polls.length > 0 && pollElts}
                {polls && !polls.length && (
                    <div className={styles.noPolls}>
                        No Polls yet. <Link to='/poll'>Create one now!</Link>
                    </div>
                )}
                {error && <ErrorMessage error={error}/>}
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    sortingType: state.app.sortingType,
    sortingDir: state.app.sortingDir
});

const mapDispatchToProps = dispatch => ({
    setSortingType: value => dispatch(changeOption('sortingType', value)),
    setSortingDir: value => dispatch(changeOption('sortingDir', value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListPolls);

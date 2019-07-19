import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ClipboardLink } from 'components';
import { formatDate } from 'utils';
import { openModal } from 'components/Modal/actions';
import { SigninModal, SignupModal } from 'components/Authentication';

import { protections } from 'config.json';
import styles from './PollDetails.module.css';

PollDetails.propTypes = {
    poll: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        createdAt: PropTypes.number.isRequired,
        protection: PropTypes.string.isRequired,
        votesCount: PropTypes.number.isRequired,
        owns: PropTypes.bool
    }).isRequired,
    user: PropTypes.object,
    onDelete: PropTypes.func.isRequired,
    openSignin: PropTypes.func.isRequired,
    openSignup: PropTypes.func.isRequired
};

function PollDetails({ poll, user, onDelete, openSignin, openSignup }) {
    const { _id, title, description, createdAt, protection, owns, votesCount } = poll;
    const canVote = protection !== 'AUTHENTICATED' || user;

    return (
        <>
            <div className={styles.title}>
                {title} |<span>{votesCount} votes</span>
            </div>
            <div className={styles.date}>{formatDate(createdAt)}</div>
            {description && <div className={styles.desc}>{description}</div>}
            <div className={styles.opts}>
                <ClipboardLink
                    className={styles.share}
                    label='Shareable Link'
                    link={`http://${window.location.hostname}:3000/poll/${_id}`}
                />
                {owns && (
                    <button className={styles.delete} onClick={onDelete}>Delete Poll</button>
                )}
            </div>
            {!canVote && (
                <div className={styles.needSignin}>
                    <div>
                        <span onClick={openSignin}>Sign in</span> to be able to vote.
                    </div>
                    <div>
                        No account? Create one <span onClick={openSignup}>here</span>.
                    </div>
                </div>
            )}
            {protection !== 'NONE' && (
                <div className={styles.protection}>
                    <span role='img' aria-label='lock'>&#x1f512;</span>
                    {protections[protection]}
                </div>
            )}
        </>
    );
}

const mapDispatchToProps = dispatch => ({
    openSignin: () => dispatch(openModal('signin', SigninModal)),
    openSignup: () => dispatch(openModal('signup', SignupModal))
});

export default connect(null, mapDispatchToProps)(PollDetails);

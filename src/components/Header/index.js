import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import cn from 'classnames';

import Hamburger from './Hamburger';
import { SigninModal, SignupModal } from 'components/Authentication';
import { openModal } from 'components/Modal/actions';
import { signOut } from 'components/Authentication/actions';

import styles from './Header.module.css';

Header.propTypes = {
    openSigninModal: PropTypes.func.isRequired,
    openSignupModal: PropTypes.func.isRequired,
    signoutAction: PropTypes.func.isRequired,
    user: PropTypes.object
};

function Header({ openSigninModal, openSignupModal, signoutAction, user }) {

    const [showItems, setShowItems] = useState();
    const toggleMenu = val => setShowItems(val);
    const handleContainerClick = () => setShowItems(false);

    return (
        <header className={styles.header}>
            <Link to='/'>
                <div className={styles.titleWrapper}>
                    <div className={styles.logo} />
                    <div className={styles.title}>
                        Pollaborate
                    </div>
                </div>
            </Link>
            <div className={styles.items}>
                <Hamburger className={styles.hamburger} onChange={toggleMenu} show={showItems} />
                <div
                    className={cn(styles.wrapper, {[styles.showItems]: showItems})}
                    onClick={handleContainerClick}
                >
                    {!user && (
                        <>
                            <Link to='/poll'>
                                <button className={styles.newPoll}>Create Poll</button>
                            </Link>
                            <button data-test='sign-in' className={styles.button} onClick={openSigninModal}>Sign in</button>
                            <button data-test='sign-up' className={styles.button} onClick={openSignupModal}>Sign up</button>
                        </>
                    )}
                    {user && (
                        <>
                            <div data-test='greetings' className={styles.greetings}>Hi, {user.username}!</div>
                            <Link to='/poll'>
                                <button className={styles.newPoll}>Create Poll</button>
                            </Link>
                            <button data-test='sign-out' className={styles.button} onClick={signoutAction}>Sign out</button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    openSigninModal: () => dispatch(openModal('signin', SigninModal)),
    openSignupModal: () => dispatch(openModal('signup', SignupModal)),
    signoutAction: () => dispatch(signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

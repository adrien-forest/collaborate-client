import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form, ModalContainer } from 'components';
import { signIn } from 'components/Authentication/actions';

SigninModal.propTypes = {
    signInAction: PropTypes.func.isRequired,
    user: PropTypes.object,
    err: PropTypes.shape({
        message: PropTypes.string
    }),
    onClose: PropTypes.func.isRequired
};

function SigninModal({ signInAction, user, err, onClose }) {

    const username = useRef();
    const password = useRef();

    const handleSubmit = async evt => {
        evt.preventDefault();

        const usernameVal = username.current.value.trim();
        const passwordVal = password.current.value.trim();
        if (!usernameVal.length || !passwordVal.length) {
            return setError({ message: 'Please fill in all fields' });
        }

        prevError.current = null;
        signInAction(usernameVal, passwordVal);
    }

    useEffect(() => {
        user && onClose();
    }, [user, onClose]);

    const [error, setError] = useState();
    const prevError = useRef(err);
    useEffect(() => {
        if (!prevError.current) {
            setError(err);
        }
    }, [err]);

    return (
        <ModalContainer onClose={onClose}>
            <h2>Sign In</h2>
            <Form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' ref={username} autoFocus />
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' ref={password} />
                <input type='submit' value='Sign in' />
                {error &&
                    <div>Error: {error.message}</div>
                }
            </Form>
        </ModalContainer>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user,
    err: state.auth.err
});

const mapDispatchToProps = dispatch => ({
    signInAction: (username, password) => dispatch(signIn(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninModal);

import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form, ModalContainer} from 'components';
import { signUp } from 'components/Authentication/actions';

SignupModal.propTypes = {
    signUpAction: PropTypes.func.isRequired,
    user: PropTypes.object,
    err: PropTypes.shape({
        message: PropTypes.string
    }),
    onClose: PropTypes.func.isRequired
};

function SignupModal({ signUpAction, user, err, onClose }) {

    const username = useRef();
    const password = useRef();
    const repPassword = useRef();

    const handleSubmit = async evt => {
        evt.preventDefault();

        const usernameVal = username.current.value.trim();
        const passwordVal = password.current.value.trim();
        const repPasswordVal = repPassword.current.value.trim();
        if (!usernameVal.length || !passwordVal.length || passwordVal !== repPasswordVal) {
            return setError({ message: 'Some of the fields are either invalid or missing' });
        }

        const userInfo = {
            username: usernameVal,
            password: passwordVal
        };

        prevError.current = null;
        signUpAction(userInfo);
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
            <h2>Sign Up</h2>
            <Form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' ref={username} autoFocus />
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' ref={password} />
                <label htmlFor='repPassword'>Repeat Password</label>
                <input type='password' id='repPassword' ref={repPassword} />
                <input type='submit' value='Sign up' />
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
    signUpAction: userInfo => dispatch(signUp(userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupModal);

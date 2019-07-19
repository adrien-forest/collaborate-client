import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { Header } from 'components';
import { ListPolls, CreatePoll, ViewPoll } from 'views';
import { restoreSignIn } from 'components/Authentication/actions';
import { ModalHost } from 'components';
import { baseUrl, SocketContext } from 'utils';

import styles from './App.module.css';

App.propTypes = {
    restoreSignInAction: PropTypes.func.isRequired
};

function App({ restoreSignInAction }) {
    restoreSignInAction();
    
    return (
        <SocketContext.Provider value={io(baseUrl)}>
            <div className={styles.app}>
                <Header />
                <ModalHost />
                <main className={styles.mainContainer}>
                    <Switch>
                        <Route exact path='/' component={ListPolls} />
                        <Route exact path='/poll' component={CreatePoll} />
                        <Route exact path='/poll/:id' component={ViewPoll} />
                        <Redirect to="/" />
                    </Switch>
                </main>
            </div>
        </SocketContext.Provider>
    );
}

const mapDispatchToProps = dispatch => ({
    restoreSignInAction: () => dispatch(restoreSignIn())
});

export default connect(null, mapDispatchToProps)(App);

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { Form } from 'components';
import { api } from 'utils';
import { decks, protections } from 'config.json';

CreatePoll.propTypes = {
    history: PropTypes.shape({
        replace: PropTypes.func.isRequired
    }).isRequired
};

function CreatePoll({ history }) {

    const [error, setError] = useState();
    const title = useRef();
    const description = useRef();
    const deck = useRef();
    const protection = useRef();

    const handleSubmit = async evt => {
        evt.preventDefault();

        if (!title.current.value.trim().length) {
            return setError({ message: 'Please fill in all required fields' });
        }

        const data = {
            title: title.current.value.trim(),
            description: description.current.value,
            deck: decks[deck.current.value],
            protection: protection.current.value
        };

        api.createPoll(data)
            .then(newPoll => history.replace(`/poll/${newPoll._id}`))
            .catch(setError);
    };

    return (
        <>
            <h2>Create a Poll</h2>
            <Form onSubmit={handleSubmit}>
                <label htmlFor='title'>Task Name</label>
                <input type='text' id='title' ref={title} autoFocus/><br/>
                <label htmlFor='description'>Description (optional)</label>
                <textarea id='description' ref={description}/><br/>
                <label htmlFor='deck'>Deck type</label>
                <select data-test='decks' ref={deck}>
                    {decks.map((deck, idx) => (
                        <option key={idx} value={idx}>{deck.join(', ')}</option>
                    ))}
                </select>
                <br/>
                <label htmlFor='protection'>Vote protection type</label>
                <select data-test='protections' ref={protection}>
                    {Object.keys(protections).map(key => (
                        <option key={key} value={key}>{protections[key]}</option>
                    ))}
                </select>
                <br/>
                <input type='submit' value='Create Poll' />
                {error && <div data-test='error'>Error: {error.message}</div>}
            </Form>
        </>
    );
}

export default CreatePoll;

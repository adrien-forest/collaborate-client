import React from 'react';

const messages = [
    'Hmmmm, we seem to be broken right now...\nPlease try again in a bit.',
    'Oooops, we seem to be having an issue at the moment...\nPlease try again later.'
];

function ErrorMessage() {
    return (
        <h3 style={{ whiteSpace: 'pre-wrap' }}>
            {messages[Math.floor(Math.random() * messages.length)]}
        </h3>
    )
}

export default ErrorMessage;

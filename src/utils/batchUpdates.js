import ReactDOM from 'react-dom';

export default function batchUpdates(func) {
    ReactDOM.unstable_batchedUpdates(func);
}

import { fetch } from 'utils';

export default {
  getStoredUser,
  updateStoredUser,
  signUp,
  signIn,
  signOut,
  getPolls,
  getPoll,
  createPoll,
  votePoll,
  deletePoll
};

export const baseUrl = `http://${window.location.hostname}:4000`;

const STORAGE_USER_KEY = 'collaborate:user';

function getAuthHeader() {
  const userStr = window.localStorage.getItem(STORAGE_USER_KEY);
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      return { 'Authorization': 'Bearer ' + user.token };
    } catch (e) {}
  }
}

function getStoredUser() {
  const userStr = window.localStorage.getItem(STORAGE_USER_KEY);
  if (userStr) {
    return JSON.parse(userStr);
  }
}

function setStoredUser(user) {
  window.localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
}

function updateStoredUser(user) {
  const usrObj = getStoredUser();
  if (usrObj) {
    usrObj.user = user;
  }
  setStoredUser(usrObj);
}

async function signUp(userData) {
  return fetch(`${baseUrl}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  .then(user => {
    setStoredUser(user);
    return user;
  });
}

async function signIn(username, password) {
  return fetch(`${baseUrl}/users/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(user => {
    setStoredUser(user);
    return user;
  });
}

function signOut() {
  window.localStorage.removeItem(STORAGE_USER_KEY);
}

async function getPolls() {
  return fetch(`${baseUrl}/polls`, {
    headers: { ...getAuthHeader(), 'Content-Type': 'application/json' }
  });
}

async function getPoll(id) {
  return fetch(`${baseUrl}/polls/${id}`, {
    headers: { ...getAuthHeader(), 'Content-Type': 'application/json' }
  });
}

async function createPoll(pollFields) {
  const { title, description, deck, protection } = pollFields;
  const pollData = {
    title,
    description,
    deck,
    protection
  };

  return fetch(`${baseUrl}/polls`, {
    method: 'POST',
    headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(pollData)
  });
}

async function votePoll(pollId, card) {
  const vote = { vote: card };
  return fetch(`${baseUrl}/polls/${pollId}`, {
    method: 'PUT',
    headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(vote)
  });
}

async function deletePoll(pollId) {
  return fetch(`${baseUrl}/polls/${pollId}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() }
  });
}

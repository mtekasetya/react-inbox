// CONSTANTS
export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const SELECT_ALL_MESSAGES = 'SELECT_ALL_MESSAGES';
export const STARRED_MESSAGE = 'STARRED_MESSAGE';
export const MARK_AS_READ = 'MARK_AS_READ';
export const MARK_AS_UNREAD = 'MARK_AS_UNREAD';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const SELECT_MESSAGE = 'SELECT_MESSAGE';
export const SUBMIT_MESSAGE = 'SUBMIT_MESSAGE';
export const ADD_LABEL = 'ADD_LABEL';
export const REMOVE_LABEL = 'REMOVE_LABEL';
export const SUBJECT_CHANGE = 'SUBJECT_CHANGE';
export const BODY_CHANGE = 'BODY_CHANGE';
export const COMPOSE = 'COMPOSE';

// HELPERS
const getOptions = (payload, method = 'PATCH') => {
  return {
    method: method,
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  };
};

// ACTIONS
export function fetchMessages() {
  return async (dispatch) => {
    const response = await fetch(`/api/messages`);
    const json = await response.json();
    dispatch({
      type: MESSAGES_RECEIVED,
      payload: json._embedded.messages
    })
  }
}

export function selectAllMessages(payload) {
  return (dispatch) => {
    dispatch({
      type: SELECT_ALL_MESSAGES,
      payload,
    })
  }
}

export function selectMessage(payload) {
  return (dispatch) => {
    dispatch({
      type: SELECT_MESSAGE,
      payload,
    })
  }
}

export function markAsRead(payload) {
  const options = getOptions(payload);
  return async (dispatch) => {
    await fetch(`/api/messages`, options);
    dispatch({
      type: MARK_AS_READ,
      payload: null,
    })
  }
}

export function markAsUnread(payload) {
  const options = getOptions(payload);
  return async (dispatch) => {
    await fetch(`/api/messages`, options);
    dispatch({
      type: MARK_AS_UNREAD,
      payload: null,
    })
  }
}

export function starred(payload) {
  const options = getOptions(payload);
  return async (dispatch) => {
    await fetch(`/api/messages`, options);
    dispatch({
      type: STARRED_MESSAGE,
      payload,
    })
  }
}

export function deleteMessage(payload) {
  const options = getOptions(payload);
  return async (dispatch) => {
    await fetch(`/api/messages`, options);
    dispatch({
      type: DELETE_MESSAGE,
      payload,
    })
  }
}

export function addLabel(payload) {
  const options = getOptions(payload);
  return async (dispatch) => {
    await fetch(`/api/messages`, options);
    dispatch({
      type: ADD_LABEL,
      payload,
    })
  }
}

export function removeLabel(payload) {
  const options = getOptions(payload);
  return async (dispatch) => {
    await fetch(`/api/messages`, options);
    dispatch({
      type: REMOVE_LABEL,
      payload,
    })
  }
}

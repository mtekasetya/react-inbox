// CONSTANTS
export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
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
export const fetchMessages = () => {
  return async (dispatch) => {
    const response = await fetch(`/api/messages`);
    const json = await response.json();
    dispatch({
      type: MESSAGES_RECEIVED,
      payload: json._embedded.messages
    })
  }
};

export const fetchMessage = (id) => {
  return async (dispatch) => {
    const response = await fetch(`/api/messages/${id}`);
    const message = await response.json();
    dispatch({
      type: MESSAGE_RECEIVED,
      payload: message
    })
  }
};

export const selectAllMessages = payload => {
  return (dispatch) => {
    dispatch({
      type: SELECT_ALL_MESSAGES,
      payload,
    })
  }
};

export const selectMessage = payload => {
  return (dispatch) => {
    dispatch({
      type: SELECT_MESSAGE,
      payload,
    })
  }
};

export const markAsRead = payload => {
  const options = getOptions(payload);
  return async (dispatch) => {
    await fetch(`/api/messages`, options);
    dispatch({
      type: MARK_AS_READ,
      payload: null,
    })
  }
};

export const markAsUnread = payload => {
  const options = getOptions(payload);
  return async (dispatch) => {
    await fetch(`/api/messages`, options);
    dispatch({
      type: MARK_AS_UNREAD,
      payload: null,
    })
  }
};

export const starred = payload => {
  const options = getOptions(payload);
  return async (dispatch) => {
    await fetch(`/api/messages`, options);
    dispatch({
      type: STARRED_MESSAGE,
      payload,
    })
  }
};

export const deleteMessage = payload => {
  const options = getOptions(payload);
  return async (dispatch) => {
    await fetch(`/api/messages`, options);
    dispatch({
      type: DELETE_MESSAGE,
      payload,
    })
  }
};

export const addLabel = payload => {
  const options = getOptions(payload);
  return async (dispatch) => {
    await fetch(`/api/messages`, options);
    dispatch({
      type: ADD_LABEL,
      payload,
    })
  }
};

export const removeLabel = payload => {
  const options = getOptions(payload);
  return async (dispatch) => {
    await fetch(`/api/messages`, options);
    dispatch({
      type: REMOVE_LABEL,
      payload,
    })
  }
};

export const compose = payload => {
  return dispatch => {
    dispatch({
      type: COMPOSE,
      payload,
    })
  }
};

export const subjectChange = payload => {
  return dispatch => {
    dispatch({
      type: SUBJECT_CHANGE,
      payload,
    })
  }
};

export const bodyChange = payload => {
  return dispatch => {
    dispatch({
      type: BODY_CHANGE,
      payload,
    })
  }
};

export const submit = payload => {
  const options = getOptions(payload, 'POST');
  return async (dispatch) => {
    const response = await fetch(`/api/messages`, options);
    const message = await response.json();
    dispatch({
      type: SUBMIT_MESSAGE,
      payload: message,
    })
  }
};

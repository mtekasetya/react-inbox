//*****************CONSTANTS**********************
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

//****************HELPERS*******************
const createOptions = (payload, method = 'PATCH') => {
  return {
    method: method,
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  };
};

const createAction = type => payload => ({
  type,
  payload,
});

const fetchData = (type, payload) => {
  const options = createOptions(payload);
  return async dispatch => {
    await fetch(`/api/messages`, options);
    dispatch({
      type,
      payload,
    })
  }
};

//*****************ACTIONS*******************
export const getMessages = () => {
  return async dispatch => {
    const response = await fetch(`/api/messages`);
    const json = await response.json();
    dispatch({
      type: MESSAGES_RECEIVED,
      payload: json._embedded.messages
    })
  }
};

export const getMessage = (id) => {
  const messageIds = [];
  messageIds.push(parseInt(id, 10));
  const payload = {
    command: "read",
    read: true,
    messageIds,
  };

  const options = createOptions(payload);
  return async dispatch => {
    const response = await fetch(`/api/messages/${id}`);
    await fetch(`/api/messages`, options);
    const message = await response.json();
    dispatch({
      type: MESSAGE_RECEIVED,
      payload: message
    });

    dispatch({
      type: MARK_AS_READ,
      payload,
    });
  }
};

export const submit = payload => {
  const options = createOptions(payload, 'POST');
  return async dispatch => {
    const response = await fetch(`/api/messages`, options);
    const message = await response.json();
    dispatch({
      type: SUBMIT_MESSAGE,
      payload: message,
    })
  }
};

export const markAsRead = payload => fetchData(MARK_AS_READ, payload);
export const markAsUnread = payload => fetchData(MARK_AS_UNREAD, payload);
export const starred = payload => fetchData(STARRED_MESSAGE, payload);
export const deleteMessage = payload => fetchData(DELETE_MESSAGE, payload);
export const addLabel = payload => fetchData(ADD_LABEL, payload);
export const removeLabel = payload => fetchData(REMOVE_LABEL, payload);
export const compose = createAction(COMPOSE);
export const subjectChange = createAction(SUBJECT_CHANGE);
export const bodyChange = createAction(BODY_CHANGE);
export const selectAllMessages = createAction(SELECT_ALL_MESSAGES);
export const selectMessage = createAction(SELECT_MESSAGE);

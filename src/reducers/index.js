import {combineReducers} from 'redux'
import {
  MESSAGES_RECEIVED,
  SELECT_ALL_MESSAGES,
  MARK_AS_READ,
  MARK_AS_UNREAD,
  STARRED_MESSAGE,
} from '../actions'


function messageList(state = {messages: [], isSelectAll: false}, action) {
  switch (action.type) {
    case MESSAGES_RECEIVED: {
      return {
        ...state,
        messages: action.payload,
      };
    }

    case SELECT_ALL_MESSAGES: {
      // Create a local copy
      let messages = [];
      const isSelectAll = !state.isSelectAll; //toggle
      state.messages.forEach(message => {
        message.selected = isSelectAll;
        messages.push(message)
      });

      return {
        isSelectAll,
        messages,
      };
    }

    case MARK_AS_READ: {
      // Create a local copy
      let messages = [];
      state.messages.forEach(message => {
        message.read = true;
        messages.push(message)
      });

      return {
        ...state,
        messages,
      };
    }

    case MARK_AS_UNREAD: {
      // Create a local copy
      let messages = [];
      state.messages.forEach(message => {
        message.read = false;
        messages.push(message)
      });

      return {
        ...state,
        messages,
      };
    }

    case STARRED_MESSAGE: {
      // Create a local copy
      let messages = [];
      state.messages.forEach(message => {
        messages.push(message)
      });

      // Find index
      const index = messages.findIndex(message => message.id === parseInt(action.payload.messageIds[0], 10));

      // Update object in the array
      messages[index].starred = action.payload.star;

      return {
        ...state,
        messages: messages,
      };
    }

    default: {
      return state;
    }
  }
}

function message(state = {subject: '', body: '', isCompose: false}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  messageList,
  message,
})

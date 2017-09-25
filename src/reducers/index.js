import {combineReducers} from 'redux'
import {
  MESSAGES_RECEIVED,
  MESSAGE_RECEIVED,
  SELECT_ALL_MESSAGES,
  SELECT_MESSAGE,
  MARK_AS_READ,
  MARK_AS_UNREAD,
  STARRED_MESSAGE,
  DELETE_MESSAGE,
  SUBJECT_CHANGE,
  BODY_CHANGE,
  SUBMIT_MESSAGE,
} from '../actions'
import {ADD_LABEL, COMPOSE, REMOVE_LABEL} from "../actions/index";


export const messageList = (state = {messages: [], isSelectAll: false, isCompose: false}, action) => {
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

    case SELECT_MESSAGE: {
      return {
        ...state,
        messages: action.payload,
      };
    }

    case MARK_AS_READ: {
      // Create a local copy
      let messages = [];
      state.messages.forEach(message => {
        if (message.selected) {
          message.read = true;
        }
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
        if (message.selected) {
          message.read = false;
        }
        messages.push(message)
      });

      return {
        ...state,
        messages,
      };
    }

    case DELETE_MESSAGE: {
      // Create a local copy
      let messages = [];
      state.messages.forEach(message => {
        if (!message.selected) {
          messages.push(message)
        }
      });

      messages.filter(message => {
        return message.selected !== true;
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
        messages,
      };
    }

    case ADD_LABEL: {
      // Create a local copy
      let messages = [];
      const label = action.payload.label;
      state.messages.forEach(message => {
        if (message.selected) {
          if (!message.labels.includes(label) && label !== 'Apply label') {
            message.labels.push(label);
          }
        }
        messages.push(message)
      });

      return {
        ...state,
        messages,
      };
    }

    case REMOVE_LABEL: {
      // Create a local copy
      let messages = [];
      const label = action.payload.label;
      state.messages.forEach(message => {
        if (message.selected) {
          if (message.labels.includes(label) && label !== 'Apply label') {
            // Find index.
            const index = message.labels.indexOf(label);
            if (index > -1) {
              message.labels.splice(index, 1);
            }
          }
        }
        messages.push(message)
      });

      return {
        ...state,
        messages,
      };
    }

    case SUBMIT_MESSAGE: {
      // Create a local copy
      let messages = [];
      state.messages.forEach(message => {
        messages.push(message)
      });

      messages.push(action.payload);

      return {
        ...state,
        isCompose: false,
        messages,
      };
    }

    case COMPOSE: {
      return {
        ...state,
        isCompose: action.payload.isCompose,
      }
    }

    default: {
      return state;
    }
  }
};

export const message = (state = {id: 0, subject: '', body: ''}, action) => {
  switch (action.type) {

    case MESSAGE_RECEIVED: {
      return {
        ...state,
        id: action.payload.id,
        subject: action.payload.subject,
        body: action.payload.body,
      }
    }

    case SUBJECT_CHANGE: {
      return {
        ...state,
        subject: action.payload
      }
    }

    case BODY_CHANGE: {
      return {
        ...state,
        body: action.payload
      }
    }

    case COMPOSE: {
      return {
        ...state,
        subject: '', // reset value
        body: '', // reset value
      }
    }

    default: {
      return state;
    }
  }
};

export default combineReducers({
  messageList,
  message,
})

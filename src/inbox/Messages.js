import React from 'react';
import Message from './Message';

const Messages = ({messages, onHandleSelection, onHandleStarred}) => (
  <div>
    {messages && messages.map(message => {
      return (
        <Message
          key={message.id}
          onHandleSelection={onHandleSelection}
          onHandleStarred={onHandleStarred}
          {...message}/>
      )
    })}
  </div>
);

export default Messages

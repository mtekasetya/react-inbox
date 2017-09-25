import React from 'react';
import Message from './Message';

const Messages = ({
                    messages,
                    onHandleSelect,
                    onHandleStarred,
                  }) => (
  <div>
    {messages && messages.map(message => {
      return (
        <Message
          key={message.id}
          onHandleSelection={onHandleSelect}
          onHandleStarred={onHandleStarred}
          {...message}/>
      );
    })}
  </div>
);

export default Messages;

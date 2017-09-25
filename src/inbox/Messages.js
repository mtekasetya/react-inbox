import React from 'react';
import Message from './Message';

const Messages = ({
                    messages,
                    onHandleSelect,
                    onHandleStarred,
                    onHandleOpenMessage,
                  }) => (
  <div>
    {messages && messages.map(message => {
      return (
        <Message
          key={message.id}
          onHandleSelection={onHandleSelect}
          onHandleStarred={onHandleStarred}
          onHandleOpenMessage={onHandleOpenMessage}
          {...message}/>
      );
    })}
  </div>
);

export default Messages;

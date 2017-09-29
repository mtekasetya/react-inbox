import React from 'react';
import Message from './Message';

const Messages = ({
                    messages,
                    onHandleSelect,
                    onHandleStarred,
                    onHandleOpenMessage,
                    isCompose,
                  }) => (
  <div>
    {messages && messages.map(message => {
      return (
        <Message
          key={message.id}
          isCompose={isCompose}
          onHandleSelection={onHandleSelect}
          onHandleStarred={onHandleStarred}
          onHandleOpenMessage={onHandleOpenMessage}
          {...message}/>
      );
    })}
  </div>
);

export default Messages;

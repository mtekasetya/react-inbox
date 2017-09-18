import React from 'react';
import Message from './Message';

const Messages = ({
                    messages,
                    isCompose,
                    message,
                    onHandleSelection,
                    onHandleStarred,
                    onHandleSubmit,
                    onHandleSubjectChange,
                    onHandleBodyChange,
                  }) => (
  <div>
    {
      isCompose &&
      <form className="form-horizontal well" onSubmit={onHandleSubmit}>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input
              type="text"
              onChange={onHandleBodyChange}
              value={message.subject}
              className="form-control"
              id="subject"
              placeholder="Enter a subject"
              name="subject"/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea
              name="body"
              id="body"
              value={message.values}
              className="form-control"/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Send" className="btn btn-primary"/>
          </div>
        </div>
      </form>
    }
    {messages && messages.map(message => {
      return (
        <Message
          key={message.id}
          onHandleSelection={onHandleSelection}
          onHandleStarred={onHandleStarred}
          {...message}/>
      );
    })}
  </div>
);

export default Messages;

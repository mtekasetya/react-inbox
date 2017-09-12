import React from 'react';

const getUnreadMessageCount = (messages) => {
  let unreadCount = 0;
  messages.forEach(m => {
    if (!m.read) {
      unreadCount += 1;
    }
  });

  return unreadCount;
};

const isDisabled = (messages) => {
  const result = messages.find(message => {
    return message.selected === true;
  });
  return !result;
};

const Toolbar = ({messages, isSelectAll, onHandleSelectAll, onHandleMarkedAsRead, onHandleMarkedAsUnread}) => (
  <div className="row toolbar">
    <div className="col-md-12">
      <p className="pull-right">
        <span className="badge badge">{getUnreadMessageCount(messages)}</span>
        {getUnreadMessageCount(messages) !== 1 ? `unread messages`: `unread message`}
      </p>

      <button className="btn btn-default" onClick={(e) => onHandleSelectAll(isSelectAll)}>
        <i className="fa fa-square-o"></i>
      </button>

      <button className="btn btn-default" onClick={(e) => onHandleMarkedAsRead()} disabled={isDisabled(messages)}>
        Mark As Read
      </button>

      <button className="btn btn-default" onClick={(e) => onHandleMarkedAsUnread()} disabled={isDisabled(messages)}>
        Mark As Unread
      </button>

      <select className="form-control label-select" disabled={isDisabled(messages)}>
        <option>Apply label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <select className="form-control label-select" disabled={isDisabled(messages)}>
        <option>Remove label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <button className="btn btn-default" disabled={isDisabled(messages)}>
        <i className="fa fa-trash-o"></i>
      </button>
    </div>
  </div>
);

export default Toolbar

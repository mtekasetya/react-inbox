import React from 'react';

export const getUnreadMessageCount = messages => {
  let unreadCount = 0;
  messages.forEach(m => {
    if (!m.read) {
      unreadCount += 1;
    }
  });

  return unreadCount;
};

export const isDisabled = messages => {
  const result = messages.find(message => {
    return message.selected === true;
  });
  return !result;
};

export const getSelectAllClass = messages => {
  const length = messages.length;
  const results = messages.filter(message => {
    if (message.hasOwnProperty('selected')) {
      return message.selected === true;
    }
    message.selected = false;
    return message.selected;
  });

  if (results.length === length) {
    return 'fa fa-check-square-o';
  } else if (results.length > 0 && results.length < length) {
    return 'fa fa-minus-square-o';
  } else {
    return 'fa fa-square-o';
  }
};

const Toolbar = ({messages, onHandleSelectAll, onHandleMarkAsRead, onHandleMarkAsUnRead, onHandleAddLabel, onHandleRemoveLabel, onHandleDelete}) => (
  <div className="row toolbar">
    <div className="col-md-12">
      <p className="pull-right">
        <span className="badge badge">{getUnreadMessageCount(messages)}</span>
        {getUnreadMessageCount(messages) !== 1 ? `unread messages` : `unread message`}
      </p>

      <button className="btn btn-default" onClick={onHandleSelectAll}>
        <i className={getSelectAllClass(messages)}></i>
      </button>

      <button className="btn btn-default" onClick={onHandleMarkAsRead} disabled={isDisabled(messages)}>
        Mark As Read
      </button>

      <button className="btn btn-default" onClick={onHandleMarkAsUnRead} disabled={isDisabled(messages)}>
        Mark As Unread
      </button>

      <select className="form-control label-select"
              onChange={onHandleAddLabel}
              disabled={isDisabled(messages)}>
        <option>Apply label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <select className="form-control label-select"
              onChange={onHandleRemoveLabel}
              disabled={isDisabled(messages)}>
        <option>Remove label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <button className="btn btn-default" disabled={isDisabled(messages)} onClick={onHandleDelete}>
        <i className="fa fa-trash-o"></i>
      </button>
    </div>
  </div>
);

export default Toolbar;

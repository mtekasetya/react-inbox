import React from 'react';

export const getClassName = (read, selected) => `row message ${read ? `read` : `unread`} ${selected ? `selected` : ``}`.trim();
export const getStartClassName = starred => `star fa fa-star${starred ? `` : `-o`}`.trim();
export const getLabels = labels => {
  return labels && labels.map((label, i) => {
    return (
      <span key={i} className="label label-warning">{label}</span>
    );
  });
};

const Message = ({id, subject, read, starred, labels, selected, onHandleSelection, onHandleStarred}) => (
  <div>
    <div className={getClassName(read, selected)}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input
              id={id}
              type="checkbox"
              checked={selected}
              onChange={(e) => onHandleSelection({
                id,
                checked: e.target.checked,
              })}/>
          </div>
          <div className="col-xs-2">
            <i
              id={id}
              className={getStartClassName(starred)}
              value={starred}
              onClick={onHandleStarred}>
            </i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {getLabels(labels)}
        <a href="/#">
          {subject}
        </a>
      </div>
    </div>
  </div>
);

export default Message;

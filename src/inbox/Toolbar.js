import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux'
import {
  fetchMessages,
  selectAllMessages,
  selectMessage,
  markAsRead,
  markAsUnread,
  starred,
  deleteMessage,
  addLabel,
  removeLabel,
  compose,
  subjectChange,
  bodyChange,
  submit,
} from '../actions'

class Toolbar extends Component {
  static getSelectAllClass(messages) {
    const length = messages.length || 0;
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
  }

  static isDisabled(messages) {
    const result = messages.find(message => {
      return message.selected === true;
    });
    return !result;
  }

  constructor(props) {
    super(props);
    this.getUnreadMessageCount = this.getUnreadMessageCount.bind(this);
    this.getIds = this.getIds.bind(this);
    this.onHandleAddLabel = this.onHandleAddLabel.bind(this);
    this.onHandleRemoveLabel = this.onHandleRemoveLabel.bind(this);
    this.onHandleMarkAsRead = this.onHandleMarkAsRead.bind(this);
    this.onHandleMarkAsUnread = this.onHandleMarkAsUnread.bind(this);
    this.onHandleCompose = this.onHandleCompose.bind(this);
  }

  getUnreadMessageCount(messages) {
    let unreadCount = 0;
    messages && messages.forEach(m => {
      if (!m.read) {
        unreadCount += 1;
      }
    });

    return unreadCount;
  };

  getIds(messages) {
    let messageIds = [];
    messages.forEach(message => {
      if (message.selected) {
        messageIds.push(message.id);
      }
    });

    return messageIds;
  }

  onHandleCompose(isCompose) {
    this.props.handleCompose({isCompose: !isCompose})
  }

  onHandleAddLabel = event => {
    if (event.target.value === 'Apply label') {
      return;
    }

    // Clone array
    const messages = this.props.messages.slice();

    let messageIds = this.getIds(messages);
    const label = event.target.value;
    const payload = {
      command: "addLabel",
      label,
      messageIds,
    };
    this.props.handleAddLabel(payload);
  };

  onHandleRemoveLabel(event) {
    if (event.target.value === 'Remove label') {
      return;
    }
    // Clone array
    const messages = this.props.messages.slice();

    let messageIds = this.getIds(messages);
    const label = event.target.value;
    const payload = {
      command: "removeLabel",
      label,
      messageIds,
    };
    this.props.handleRemoveLabel(payload);
  }

  onHandleMarkAsRead() {
    let messageIds = [];
    this.props.messages.forEach(message => {
      if (message.selected) {
        messageIds.push(message.id);
      }
    });

    const payload = {
      command: "read",
      read: true,
      messageIds,
    };

    this.props.handleMarkAsRead(payload);
  }

  onHandleMarkAsUnread() {
    let messageIds = [];
    this.props.messages.forEach(message => {
      if (message.selected) {
        messageIds.push(message.id);
      }
    });

    const payload = {
      command: "read",
      read: false,
      messageIds,
    };

    this.props.handleMarkAsUnread(payload);
  }

  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.getUnreadMessageCount(this.props.messages)}</span>
            {this.getUnreadMessageCount(this.props.messages) !== 1 ? `unread messages` : `unread message`}
          </p>

          <Link
            to={`${!this.props.isCompose ? `/compose` : `/`}`}
            className="btn btn-danger" onClick={() => this.onHandleCompose(this.props.isCompose)}>
            <i className="fa fa-plus"/>
          </Link>

          <button className="btn btn-default" onClick={this.props.onHandleSelectAll}>
            <i className={Toolbar.getSelectAllClass(this.props.messages)}/>
          </button>

          <button className="btn btn-default" onClick={this.onHandleMarkAsRead}
                  disabled={Toolbar.isDisabled(this.props.messages)}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={this.onHandleMarkAsUnread}
                  disabled={Toolbar.isDisabled(this.props.messages)}>
            Mark As Unread
          </button>

          <select className="form-control label-select"
                  onChange={this.onHandleAddLabel}
                  disabled={Toolbar.isDisabled(this.props.messages)}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select"
                  onChange={this.onHandleRemoveLabel}
                  disabled={Toolbar.isDisabled(this.props.messages)}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled={Toolbar.isDisabled(this.props.messages)}
                  onClick={this.onHandleDelete}>
            <i className="fa fa-trash-o"/>
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    messages: state.messageList.messages,
    isSelectAll: state.messageList.isSelectAll,
    isCompose: state.messageList.isCompose,
    subject: state.message.subject,
    body: state.message.body,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  onHandleGetMessage: fetchMessages,
  onHandleSelectAll: selectAllMessages,
  handleMarkAsRead: markAsRead,
  handleMarkAsUnread: markAsUnread,
  handleStarred: starred,
  handleSelectMessage: selectMessage,
  handleDelete: deleteMessage,
  handleAddLabel: addLabel,
  handleRemoveLabel: removeLabel,
  handleCompose: compose,
  handleSubjectChange: subjectChange,
  handleBodyChange: bodyChange,
  handleSubmit: submit,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar));

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux'
import '../App.css';
import Messages from './Messages';
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

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.onHandleSelect = this.onHandleSelect.bind(this);
  }

  componentDidMount() {
    this.props.onHandleGetMessage();
  }

  onHandleStarred = event => {
    // Find index.
    const index = this.props.messages.findIndex(message => message.id === parseInt(event.target.id, 10));

    // Update object
    const star = !this.props.messages[index].starred; // toggle true/false
    const payload = {
      command: "star",
      messageIds: [event.target.id],
      star,
    };

    this.props.handleStarred(payload);
  };

  onHandleDelete = () => {
    let messageIds = [];
    this.props.messages.forEach(message => {
      if (message.selected) {
        messageIds.push(message.id);
      }
    });

    const payload = {
      command: "delete",
      read: false,
      messageIds,
    };

    this.props.handleDelete(payload);
  };

  onHandleSelect({id, checked}) {
    // Clone array
    const messages = this.props.messages.slice();

    // Find index.
    const index = messages.findIndex(message => message.id === parseInt(id, 10));

    // Update object
    messages[index].selected = checked;

    // Action
    this.props.handleSelectMessage(messages);
  };

  render() {
    const messagesProps = {
      messages: this.props.messages,
      onHandleSelect: this.onHandleSelect,
      onHandleStarred: this.onHandleStarred,
    };

    return (
      <div>
        {this.props.messages.length &&
        <div>
          <div className="container">
            <Messages {...messagesProps} {...messagesProps}/>
          </div>
        </div>
        }
      </div>
    );
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
)(Inbox));

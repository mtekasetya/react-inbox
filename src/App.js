import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import './App.css';
import Toolbar from './inbox/Toolbar';
import Messages from './inbox/Messages';
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
} from './actions'

class App extends Component {
  constructor(props) {
    super(props);
    this.onHandleSelect = this.onHandleSelect.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.onHandleGetMessage();
  }

  getIds(messages) {
    let messageIds = [];
    messages.forEach(message => {
      if (message.selected) {
        messageIds.push(message.id);
      }
    });

    return messageIds;
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

  onHandleMarkAsRead = () => {
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
  };

  onHandleMarkAsUnread = () => {
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

  onHandleRemoveLabel = event => {
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
  };

  onHandleCompose = () => {
    this.props.handleCompose({isCompose: !this.props.isCompose})
  };

  onHandleSubjectChange = event => {
    this.props.handleSubjectChange(event.target.value);
  };

  onHandleBodyChange = event => {
    this.props.handleBodyChange(event.target.value);
  };

  async onHandleSubmit(event) {
    event.preventDefault();
    const messages = this.state.messages.slice();
    const payload = {
      subject: this.state.subject,
      body: this.state.body
    };
    const options = this.onHandleOptions(payload, 'POST');
    const response = await this.onHandleFetch('/api/messages/', options);
    const message = await response.json();
    messages.push(message);
    this.setState({
      messages,
      isCompose: false, // close the compose email
      subject: '', // reset
      body: '', // reset
    });
  };

  render() {

    return (
      <div>
        {this.props.messages.length &&
        <div>
          <div className="container">
            <Toolbar
              messages={this.props.messages}
              onHandleSelectAll={this.props.onHandleSelectAll}
              onHandleMarkAsRead={this.onHandleMarkAsRead}
              onHandleMarkAsUnRead={this.onHandleMarkAsUnread}
              onHandleAddLabel={this.onHandleAddLabel}
              onHandleRemoveLabel={this.onHandleRemoveLabel}
              onHandleDelete={this.onHandleDelete}
              onHandleCompose={this.onHandleCompose}
            />
            <Messages
              messages={this.props.messages}
              subject={this.props.subject}
              body={this.props.body}
              isCompose={this.props.isCompose}
              onHandleSelect={this.onHandleSelect}
              onHandleStarred={this.onHandleStarred}
              onHandleSubmit={this.onHandleSubmit}
              onHandleSubjectChange={this.onHandleSubjectChange}
              onHandleBodyChange={this.onHandleBodyChange}
            />
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
    subject: state.message.subject,
    body: state.message.body,
    isCompose: state.message.isCompose,
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
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

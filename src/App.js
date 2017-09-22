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
} from './actions'

class App extends Component {
  constructor(props) {
    super(props);
    this.onHandleSelect = this.onHandleSelect.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onHandleSubjectChange = this.onHandleSubjectChange.bind(this);
    this.onHandleBodyChange = this.onHandleBodyChange.bind(this);
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
    // Clone array
    const messages = this.state.messages.slice();

    let messageIds = [];
    messages.forEach(message => {
      if (message.selected) {
        messageIds.push(message.id);
      }
    });

    const payload = {
      command: "delete",
      messageIds,
    };

    const options = this.onHandleOptions(payload);

    this.onHandleFetch('/api/messages/', options)
      .then(() => {
        const results = messages.filter(message => {
          return message.selected !== true;
        });
        this.setState({
          messages: results,
        });
      });
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
    // Copy array to local
    const messages = this.state.messages.slice();

    let messageIds = [];
    let labels = [];
    const label = event.target.value;
    messages.forEach(message => {
      if (message.selected) {
        if (!message.labels.includes(label) && label !== 'Apply label') {
          message.labels.push(label);
          labels.push(label);
          messageIds.push(message.id);
        }
      }
    });

    const payload = {
      command: "addLabel",
      label,
      messageIds,
    };

    const options = this.onHandleOptions(payload);

    this.onHandleFetch('/api/messages/', options)
      .then(() => {
        this.setState({
          messages,
        });
      });
  };

  onHandleRemoveLabel = event => {
    // Copy array to local
    const messages = this.state.messages.slice();

    let messageIds = [];
    const label = event.target.value;
    messages.forEach(message => {
      if (message.selected) {
        if (message.labels.includes(label) && label !== 'Apply label') {

          // Find index.
          const index = message.labels.indexOf(label);
          if (index > -1) {
            message.labels.splice(index, 1);
            messageIds.push(message.id);
          }
        }
      }
    });

    const payload = {
      command: "removeLabel",
      label,
      messageIds,
    };

    const options = this.onHandleOptions(payload);

    this.onHandleFetch('/api/messages/', options)
      .then(() => {
        this.setState({
          messages,
        });
      });
  };

  onHandleCompose = () => {
    this.setState({isCompose: !this.state.isCompose})
  };

  onHandleSubjectChange(value) {
    this.setState({
      subject: value
    })
  };

  onHandleBodyChange(value) {
    this.setState({
      body: value
    })
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
    subject: state.subject,
    body: state.body,
    isSelectAll: state.messageList.isSelectAll,
    isCompose: state.isCompose,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  onHandleGetMessage: fetchMessages,
  onHandleSelectAll: selectAllMessages,
  handleMarkAsRead: markAsRead,
  handleMarkAsUnread: markAsUnread,
  handleStarred: starred,
  handleSelectMessage: selectMessage,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

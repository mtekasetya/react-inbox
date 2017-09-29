import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import '../App.css';
import Messages from './Messages';
import {
  fetchMessages,
  selectMessage,
  starred,
  compose,
} from '../actions'

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.onHandleSelect = this.onHandleSelect.bind(this);
  }

  componentDidMount() {
    this.props.onHandleGetMessages();
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

  openMessage = () => {
    this.props.handleUpdateCompose({isCompose: !this.props.isCompose})
  };


  render() {
    const messagesProps = {
      messages: this.props.messages,
      onHandleSelect: this.onHandleSelect,
      onHandleStarred: this.onHandleStarred,
      onHandleOpenMessage: this.openMessage,
      isCompose: this.props.isCompose,
    };

    return (
      <div>
        {this.props.messages.length &&
        <div>
          <div className="container">
            <Messages {...messagesProps}/>
          </div>
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messageList.messages,
    isCompose: state.messageList.isCompose,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  onHandleGetMessages: fetchMessages,
  handleStarred: starred,
  handleSelectMessage: selectMessage,
  handleUpdateCompose: compose,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inbox);

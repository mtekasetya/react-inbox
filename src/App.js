import React, {Component} from 'react';
import './App.css';
import Toolbar from './inbox/Toolbar';
import Messages from './inbox/Messages';
import inboxData from './inbox/inboxData'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: inboxData,
      isSelectAll: false,
    }
  }

  onHandleSelection = (value) => {
    // Copy array to local
    const data = Object.assign([], this.state.messages);

    // Find index.
    const index = data.findIndex(message => message.id === parseInt(value.id, 10));

    // Update object
    data[index].selected = value.checked;

    // Update state
    this.setState({messages: data});
  };

  onHandleStarred = (id) => {
    // Copy array to local
    const data = Object.assign([], this.state.messages);

    // Find index.
    const index = data.findIndex(message => message.id === id);

    // Update object
    data[index].starred = !data[index].starred;

    // Update state
    this.setState({messages: data});
  };

  onHandleSelectAll = (value) => {
    // Copy array to local
    const data = Object.assign([], this.state.messages);

    data.forEach(message => {
      message.selected = !value;
    });

    this.setState({
      isSelectAll: !value,
      messages: data,
    });
  };

  render() {
    return (
      <div className="container">
        <Toolbar
          messages={this.state.messages}
          isSelectAll={this.state.isSelectAll}
          onHandleSelectAll={this.onHandleSelectAll}
        />
        <Messages
          messages={this.state.messages}
          onHandleSelection={this.onHandleSelection}
          onHandleStarred={this.onHandleStarred}
        />
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import './App.css';
import Toolbar from './inbox/Toolbar';
import Messages from './inbox/Messages';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isSelectAll: false,
    };
    this.onHandleFetch = this.onHandleFetch.bind(this);
    this.onHandleSelection = this.onHandleSelection.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await this.onHandleFetch('/api/messages');
      const messages = await response.json();
      this.setState({
        messages: messages._embedded.messages || [],
      });
    } catch (error) {
      this.onHandleError(error);
    }
  }

  async onHandleFetch(url, options = {method: 'GET'}) {
    return await fetch(url, options);
  }

  onHandleStarred = event => {
    // Clone array
    const messages = this.state.messages.slice();

    // Find index.
    const index = messages.findIndex(message => message.id === parseInt(event.target.id, 10));

    // Update object
    messages[index].starred = !messages[index].starred; // toggling true/false

    const payload = {
      command: "star",
      messageIds: [event.target.id],
      star: messages[index].starred
    };

    const options = this.onHandleOptions(payload);

    this.onHandleFetch('/api/messages/', options)
      .then(() => {
        this.setState({
          messages,
        });
      });
  };

  onHandleSelectAll = () => {
    // Clone array
    const messages = this.state.messages.slice();
    const isSelectAll = !this.state.isSelectAll; //toggle
    messages.forEach(message => {
      message.selected = isSelectAll;
    });

    this.setState({
      messages,
      isSelectAll
    })
  };

  onHandleMarkAsRead = () => {
    // Clone array
    const messages = this.state.messages.slice();

    let messageIds = [];
    messages.forEach(message => {
      if (message.selected) {
        message.read = true;
        messageIds.push(message.id);
      }
    });

    const payload = {
      command: "read",
      read: true,
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

  onHandleMarkAsUnRead = () => {
    // Clone array
    const messages = this.state.messages.slice();

    let messageIds = [];
    messages.forEach(message => {
      if (message.selected) {
        message.read = false;
        messageIds.push(message.id);
      }
    });

    const payload = {
      command: "read",
      read: false,
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

  onHandleError = error => console.error(`Error encountered while getting data from server: ${error}`);

  onHandleSelection({id, checked}) {
    // Clone array
    const messages = this.state.messages.slice();

    // Find index.
    const index = messages.findIndex(message => message.id === parseInt(id, 10));

    // Update object
    messages[index].selected = checked;

    // Update state
    this.setState({messages});
  };

  onHandleOptions = (payload) => {
    return {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    };
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

  render() {
    return (
      <div className="container">
        <Toolbar
          messages={this.state.messages}
          onHandleSelectAll={this.onHandleSelectAll}
          onHandleMarkAsRead={this.onHandleMarkAsRead}
          onHandleMarkAsUnRead={this.onHandleMarkAsUnRead}
          onHandleAddLabel={this.onHandleAddLabel}
          onHandleRemoveLabel={this.onHandleRemoveLabel}
          onHandleDelete={this.onHandleDelete}
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

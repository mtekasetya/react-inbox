import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux'
import {
  getMessage,
  compose,
  subjectChange,
  bodyChange,
  submit,
} from '../actions'

class Compose extends Component {
  constructor(props) {
    super(props);
    this.onHandleSubjectChange = this.onHandleSubjectChange.bind(this);
    this.onHandleBodyChange = this.onHandleBodyChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.props.onHandleGetMessage(id);
    }

    if (!this.props.isCompose) {
      this.props.updateIsCompose({isCompose: !this.props.isCompose})
    }
  }

  onHandleSubjectChange(event) {
    this.props.handleSubjectChange(event.target.value);
  };

  onHandleBodyChange(event) {
    this.props.handleBodyChange(event.target.value);
  };

  onHandleSubmit(event) {
    event.preventDefault();
    const payload = {
      subject: this.props.subject,
      body: this.props.body
    };

    this.props.handleSubmit(payload);
    this.props.history.push('/');
  }

  render() {
    return (
      <form className="form-horizontal well" onSubmit={this.onHandleSubmit}>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input
              type="text"
              onChange={this.onHandleSubjectChange}
              value={this.props.subject}
              className="form-control"
              id="subject"
              placeholder="Enter a subject"
              name="subject"/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
        <textarea
          name="body"
          id="body"
          value={this.props.body}
          onChange={this.onHandleBodyChange}
          className="form-control"/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Send" className="btn btn-primary"/>
          </div>
        </div>
      </form>
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
  onHandleGetMessage: getMessage,
  updateIsCompose: compose,
  handleSubjectChange: subjectChange,
  handleBodyChange: bodyChange,
  handleSubmit: submit,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Compose));

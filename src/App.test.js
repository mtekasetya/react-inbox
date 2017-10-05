import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import renderer from 'react-test-renderer';
import App from './App';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  messageList: {messages: []},
  message: {
    subject: null,
    body: null,
  }
});

describe('App', () => {
  afterEach(() => {
    fetchMock.restore()
  });

  it('renders without error', () => {
    fetchMock.get('end:/api/messages', {
      _links: {
        self: {
          href: "http://localhost:8083/api/messages"
        }
      },
      _embedded: {
        messages: [
          {
            "_links": {
              "self": {
                "href": "http://localhost:8083/api/messages/1"
              }
            },
            "id": 1,
            "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
            "starred": true,
            "read": false,
            "labels": [
              "dev",
              "personal"
            ]
          },
        ]
      }
    });

    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <Provider store={store}>
          <App/>
        </Provider>
      </MemoryRouter>
      , div)
  })
});

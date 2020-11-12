import * as React from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import dotenv from 'dotenv';

const MML_BACKEND_URI = process.env.MML_BACKEND_URI || 'http://localhost:3001';

const backendUri = MML_BACKEND_URI.replace(/^http/, 'ws'); //THIS WORKS

interface IMessage {
  name: string; //name of the message sender
  message: string; //text content of the message
}

interface IChatState {
  name: string;
  messages: IMessage[];
  ws?: WebSocket;
}

class Chat extends React.Component<any, IChatState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: 'Bob',
      messages: [], //messages received from server
    };
  }

  ws = new WebSocket(backendUri);

  componentWillMount() {
    this.setState({
      ws: this.ws,
    });
  }

  componentDidMount() {

    };

    this.state.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data);
      this.addMessage(message);
    };

    this.state.ws.onclose = () => {
      logger.info('disconnected from' + backendUri);
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(backendUri),
      });
    };
  }

  addMessage = message =>
    this.setState(state =>
      //add new message up front of the previous state.messages
      ({messages: [message, ...state.messages]})
    );

  submitMessage = (messageString: string) => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = {name: this.state.name, message: messageString};
    this.state.ws.send(JSON.stringify(message));
    this.addMessage(message); //this really needed? Yes. The server excluded the original sender in forwarding messages to clients
  };

  render() {
    return (
      <div>
        <label htmlFor="name">
          Name:&nbsp;
          <input
            type="text"
            id={'name'}
            placeholder={'Enter your name...'}
            value={this.state.name}
            onChange={e => this.setState({name: e.target.value})}
          />
        </label>
        <ChatInput
          //ws={this.ws}
          onSubmitMessage={messageString => this.submitMessage(messageString)}
        />
        {this.state.messages.map((message, index) =>
          <ChatMessage
            key={index}
            message={message.message}
            name={message.name}
          />
        )}
      </div>
    );
  }
}

export default Chat;

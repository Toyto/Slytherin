import Message from './message';

var React = require('react');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      error: null
    };
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchHistory() {
    var that = this;

    axios.get('http://localhost:8000/messages/')
    .then(function (response) {
      var messages = response.data.messages;
      that.setState({ messages: messages });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    var that = this;

    this.ws = new WebSocket('ws://localhost:8000');
    this.ws.onopen = e => console.log('Socket Opened');
    this.ws.onerror = e => this.setState({ error: 'WebSocket error' });
    this.ws.onclose = e => !e.wasClean && console.log({ error: `WebSocket error: ${e.code} ${e.reason}` });

    this.fetchHistory();
  }

  componentWillUnmount() {
    this.ws.close();
  }

  handleMessageChange(e) {
    this.setState({ message: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var that = this;
    var messages = this.state.messages;

    this.ws.send(JSON.stringify({
      text: this.state.message,
      username: this.props.username
    }));

    this.ws.onmessage = function(e) {
      var data = JSON.parse(e.data);
      messages.push({text: data.text, user: data.user});
      that.setState({ messages: messages });
      console.log(that.state.messages);
    }
    this.setState({ message: '' });
  }

  render() {
    const all_messages = this.state.messages.map((m) =>
      <Message key={Math.random()} user={m.user} text={m.text} />
    );
    return (
        <div>
          <div className="messagesBox">
            { all_messages }
          </div>
          <form onSubmit={this.handleSubmit} className="form-style-7">
            <ul> 
              <li>
                <label htmlFor="message">Message</label>
                <input type="text" name="message" placeholder="Dummy message" value={this.state.message} onChange={this.handleMessageChange} />
              </li>
              <li>
                <button type="submit">Send!</button>
              </li>
            </ul>
          </form>
        </div>
    )
  }
}

export default App;
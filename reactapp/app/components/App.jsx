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
      console.log(response);
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
    this.ws.onerror = e => this.setState({ error: 'WebSocket error' });
    this.ws.onclose = e => !e.wasClean && this.setState({ error: `WebSocket error: ${e.code} ${e.reason}` });

    this.fetchHistory();
  }

  componentWillUnmount() {
    this.ws.close();
  }

  handleMessageChange(e) {
    this.setState({ message: e.target.value });
  }

  handleSubmit() {
    var that = this;
    var messages = this.state.messages;

    this.ws.send(JSON.stringify({
      text: this.state.message,
      username: this.props.username
    }));

    this.ws.onmessage = function(e) { 
      messages.push({text: e.data, user: that.props.username});
      that.setState({ messages: messages });
    }

    this.setState({ message: '' });
  }

  _onMouseMove(e) {
    this.fetchHistory();
  }

  render() {
    const all_messages = this.state.messages.map((m) =>
      <Message key={Math.random()} user={m.user} text={m.text} />
    );
    return (
      <div onMouseMove={this._onMouseMove.bind(this)}>
        { all_messages }
        <form>
          <input type="text" name="message" placeholder="Dummy message" value={this.state.message} onChange={this.handleMessageChange} />
          <button type="button" onClick={this.handleSubmit}>Send!</button>
        </form>
      </div>
    )
  }
}

export default App;
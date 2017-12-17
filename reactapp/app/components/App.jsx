var React = require('react');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      error: null
    };
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.ws = new WebSocket('ws://localhost:8000');
    this.ws.onmessage = e => alert(e.data);
    this.ws.onerror = e => this.setState({ error: 'WebSocket error' });
    this.ws.onclose = e => !e.wasClean && this.setState({ error: `WebSocket error: ${e.code} ${e.reason}` });
  }

  componentWillUnmount() {
    this.ws.close();
  }

  handleMessageChange(e) {
    this.setState({ message: e.target.value });
  }

  handleSubmit() {
    this.ws.send(JSON.stringify({
      "text": this.state.message
    }));
  }

  render() {
    return (
      <form>
        <input type="text" name="message" placeholder="Dummy message" value={this.state.message} onChange={this.handleMessageChange} />
        <button type="button" onClick={this.handleSubmit}>Send!</button>
      </form>
    )
  }
}

export default App;
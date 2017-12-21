import App from './app';

var axios = require('axios');
var React = require('react');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      login_done: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var that = this;

    axios.post('http://localhost:8000/create_new_user/', {
        name: this.state.name,
        email: this.state.email
    })
    .then(function (response) {
      if (response.data.success){
          that.setState({login_done: !that.state.login_done});
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    this.forceUpdate();
  }

  render() {
    if (!this.state.login_done){
      return (
        <form onSubmit={this.handleSubmit} className="form-style-7">
          <ul>
            <li>
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="Your Email" value={this.state.email} onChange={this.handleEmailChange} />
            </li>
            <li>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" placeholder="Your Name" value={this.state.name} onChange={this.handleNameChange} />
            </li>
            <li>
              <button type="submit">Login me!</button>
            </li>
          </ul>
        </form>
    )}
    else {
      return (
        <App username={this.state.name} />
      )
    }
  }
}

export default Login;
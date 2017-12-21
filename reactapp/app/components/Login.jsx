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

  handleSubmit() {
    axios.get('http://localhost:8000/create_new_user/', {
      params: {
        name: this.state.name,
        email: this.state.email
      }
    })
    .then(function (response) {
      if(response){
        this.setState({login_done: !this.state.login_done});
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <form>
        <input type="text" name="email" placeholder="Your Email" value={this.state.email} onChange={this.handleEmailChange} />
        <input type="text" name="name" placeholder="Your Name" value={this.state.name} onChange={this.handleNameChange} />
        <button type="button" onClick={this.handleSubmit}>Login me!</button>
      </form>
    )
  }
}

export default Login;
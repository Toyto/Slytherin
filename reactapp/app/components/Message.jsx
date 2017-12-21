var React = require('react');

class Message extends React.Component {
    render() {
        return (
            <div className="container">
                {`${this.props.user} : ${this.props.text}`}
            </div>
        )
    }
}

export default Message;
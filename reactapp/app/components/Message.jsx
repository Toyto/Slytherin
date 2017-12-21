var React = require('react');

class Message extends React.Component {
    render() {
        return (
            <div className="message">
                {`${this.props.user} : ${this.props.text}`}
            </div>
        )
    }
}

export default Message;
import React from 'react';
import { PropTypes } from 'prop-types';
import './LoginCard.css';
import LoginGreet from '../LoginGreet/LoginGreet';
import LoginForm from '../LoginForm/LoginForm';

class LoginCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    LoginCard.propTypes = {
      onChange: PropTypes.func.isRequired,
      onClick: PropTypes.func.isRequired,
      username: PropTypes.string.isRequired,
    };
  }

  render() {
    const { onChange, onClick } = this.props;
    return (
      <div className="LoginCard-outer">
        <span className="LoginCard-greet"><LoginGreet /></span>
        <span className="LoginCard-form"><LoginForm
          onClick={onClick}
          username={this.props.username}
          onChange={event => onChange(event)}
        />
        </span>
      </div>
    );
  }
}


export default LoginCard;

import React from 'react';
import { PropTypes } from 'prop-types';
import { Text, View } from 'react-native';
import styles from './LoginCard.style';
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
      <View className="LoginCard-outer" style={styles.LoginCardOuter}>
        <Text className="LoginCard-greet" style={styles.LoginCardGreet}><LoginGreet /></Text>
        <Text className="LoginCard-form" style={styles.LoginCardForm}><LoginForm
          onClick={onClick}
          username={this.props.username}
          onChange={event => onChange(event)}
        />
        </Text>
      </View>
    );
  }
}


export default LoginCard;

import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { PropTypes } from 'prop-types';
import styles from './LoginForm.style';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    LoginForm.propTypes = {
      onChange: PropTypes.func.isRequired,
      onClick: PropTypes.func.isRequired,
      username: PropTypes.string.isRequired,
    };
  }

  render() {
    const { onChange, onClick } = this.props;
    return (
      <View className="LoginForm-outer" style={styles.LoginFormOuter}>
        <View className="LoginForm-text"><Text style={styles.LoginFormText}>Login</Text></View>
        <View className="LoginForm-label"><Text style={styles.LoginFormLabel}>Username</Text></View>
        <View className="LoginForm-inp">
          <TextInput
            style={styles.LoginFormInp}
            value={this.props.username}
            onChangeText={(event) => { onChange(event); }}
          />
        </View>
        <View className="LoginForm-btn" style={styles.LoginFormBtnView}>
          <TouchableOpacity onPress={onClick} style={styles.LoginFormTouchBtn}>
          <Text style={styles.LoginFormBtn}>
            Login
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default LoginForm;

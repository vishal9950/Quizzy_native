import React from 'react';
import { View, Text } from 'react-native';
import styles from './LoginGreet.style';

class LoginGreet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View className="LoginGreet-outer" style={styles.LoginGreetOuter}>
        <View className="LoginGreet-txt"><View className="Login-txt"><Text style={styles.LoginTxt}>Welcome</Text></View></View>
        <View className="LoginGreet-txt"><View className="Login-txt"><Text style={styles.LoginTxt}>to</Text></View></View>
        <View className="LoginGreet-main"><View className="Login-txt"><Text style={styles.LoginGreetLogo}>Quizzy !</Text></View></View>
      </View>
    );
  }
}

export default LoginGreet;

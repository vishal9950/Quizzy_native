import React from 'react';
import { View, Text } from 'react-native';
import * as styles from './Header.style';

const Header = () => (
  <View className="Header-head" style={styles.HeaderHead}>
    <Text className="Header-text" style={styles.HeaderText}>Quizzy</Text>
  </View>
);

export default Header;

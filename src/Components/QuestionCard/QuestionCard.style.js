import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  QuestionCardOuter: {
    position: 'relative',
    top: 30,
    padding: 20,
    margin: 20,
    borderWidth: 1,
    height: 'auto',
    width: '75%',
    zIndex: -1,
  },

  QuestionCardNo: {
    zIndex: -1,
  },

  QuestionCardQues: {
    borderWidth: 1,
    width: '100%',
    backgroundColor: '#6ac5f0',
    paddingTop: 10,
    paddingBottom: 10,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },

  QuestionCardStyle: {
    fontWeight: 'bold',
    width: '100%',
    zIndex: -1,
  },

  QuestionCardOptions: {
    paddingTop: 10,
    zIndex: 1,
    left: 0,
  },
});

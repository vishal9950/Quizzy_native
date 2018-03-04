import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  LoginFormOuter: {
    position: 'relative',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },

  LoginFormText: {
    position: 'relative',
    top: 10,
    left: 10,
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },

  LoginFormLabel: {
    position: 'relative',
    top: 10,
    left: 10,
    padding: 10,
    width: '100%',
    paddingTop: 70,
    fontSize: 15,
    fontWeight: 'bold',
  },
  LoginFormInp: {
    height: 40,
    width: 330,
    left: 20,
    borderColor: 'black',
    borderWidth: 2,
    position: 'relative',
    top: 20,
  },

  LoginFormBtn: {
    top: '20%',
    fontSize: 20,
    fontWeight: 'bold',
  },

  LoginFormTouchBtn: {
    marginTop: 50,
    borderWidth: 2,
    alignItems: 'center',
    borderRadius: 15,
    height: 45,
    width: 180,
  },

  LoginFormBtnView: {
    left: '95%',
  },
});

import React from 'react';
import { PropTypes } from 'prop-types';
import { View, Text } from 'react-native';
import RadioButton from 'react-native-radio-button';
import styles from './RadioButton.style';

class RadioButtonInp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    RadioButtonInp.propTypes = {
      // name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      answered: PropTypes.array.isRequired,
      ques: PropTypes.array.isRequired,
    };
  }

  render() {
    const { onChange, answered } = this.props;
    let i;
    let flag = 0;
    for (i = 0; i < this.props.answered.length; i += 1) {
      if ((this.props.answered[i].option === this.props.value) &&
      (this.props.answered[i].quesid === this.props.ques.quesid)) {
        flag = 1;
        break;
      }
    }

    // const checked = flag === 1 ? (<input type="radio"
    // name={this.props.name} value={this.props.value}
    // checked onChange={(event) => { onChange(event); }} />) : (<input
    //   type="radio"
    //   name={this.props.name}
    //   value={this.props.value}
    //   onChange={(event) => { onChange(event); }}
    // />);
    console.log(answered);
    return (
      <View className="RadioButton-body" style={styles.RadioButtonBody}>
        <RadioButton
          isSelected={flag === 0 ? false : (this.props.value === answered[i].option)}
          onPress={() => { onChange(this.props.value); }}
        />

        {/* {checked} */}
        <Text style={styles.RadioButtonLabel}> {this.props.value}</Text>
      </View>
    );
  }
}

export default RadioButtonInp;

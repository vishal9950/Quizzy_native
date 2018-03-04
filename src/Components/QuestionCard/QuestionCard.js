import React from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import RadioButton from '../RadioButton/RadioButton';
import styles from './QuestionCard.style';

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
    QuestionCard.propTypes = {
    //   username: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      ques: PropTypes.object.isRequired,
      onChange: PropTypes.func.isRequired,
      qno: PropTypes.number.isRequired,
      answered: PropTypes.array.isRequired,
    };
    this.getOptions();
  }

  getOptions = () => {
    fetch(`http://localhost:8000/options/${this.props.ques.quesid}`).then(response => response.json()).then((options) => {
      this.setState({
        options: this.state.options.concat(options),
      });
    });
  }

  render() {
    const { onChange } = this.props;
    const rows = [];
    for (let i = 0; i < this.state.options.length; i += 1) {
      rows.push(<RadioButton
        value={this.state.options[i].option}
        name={this.props.ques.ques}
        score={this.props.score}
        ques={this.props.ques}
        answered={this.props.answered}
        onChange={(value) => {
          console.log('dv');
          onChange(value, this.props.ques.quesid);
          }}
      />);
    }

    console.log(rows);
    return (
      <View className="QuestionCard-outer" style={styles.QuestionCardOuter}>
        <View className="QuestionCard-no" style={styles.QuestionCardNo}><Text style={styles.QuestionCardStyle}>Question {this.props.qno}</Text></View>
        <View className="QuestionCard-ques" style={styles.QuestionCardQues}>
          <Text style={styles.QuestionCardStyle}>{this.props.ques.ques}</Text>
        </View>
        <View style={styles.QuestionCardOptions}>
          <View>{rows}</View>
        </View>
      </View>
    );
  }
}

export default QuestionCard;


import React from 'react';
import { PropTypes } from 'prop-types';
import './RadioButton.css';

class RadioButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    RadioButton.propTypes = {
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      answered: PropTypes.array.isRequired,
      ques: PropTypes.array.isRequired,
    };
  }

  render() {
    const { onChange } = this.props;
    let i;
    let flag = 0;
    for (i = 0; i < this.props.answered.length; i += 1) {
      if ((this.props.answered[i].option === this.props.value) &&
      (this.props.answered[i].quesid === this.props.ques.quesid)) {
        flag = 1;
        break;
      }
    }

    const checked = flag === 1 ? (<input type="radio" name={this.props.name} value={this.props.value} checked onChange={(event) => { onChange(event); }} />) : (<input
      type="radio"
      name={this.props.name}
      value={this.props.value}
      onChange={(event) => { onChange(event); }}
    />);
    return (
      <div className="RadioButton-body">
        {/* <input
          type="radio"
          name={this.props.name}
          value={this.props.value}
          onChange={(event) => { onChange(event); }}
        /> */}
        {checked}
        <label>{this.props.value}</label>
      </div>
    );
  }
}

export default RadioButton;

import React from 'react';
import './LoginGreet.css';

class LoginGreet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="LoginGreet-outer">
        <div className="LoginGreet-txt"><div className="Login-txt">Welcome</div></div>
        <div className="LoginGreet-txt"><div className="Login-txt">to</div></div>
        <div className="LoginGreet-main"><div id="LoginGreet-logo" className="Login-txt">Quizzy !</div></div>
      </div>
    );
  }
}

export default LoginGreet;

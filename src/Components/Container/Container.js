import React from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import * as styles from './Container.style';
import LoginCard from '../LoginCard/LoginCard';
import QuestionCard from '../QuestionCard/QuestionCard';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      page: 1,
      users: [],
      // value: [],
      leaderboard: [],
      score: 0,
      ques: [],
      answered: [],
      ctr: 0,
    };
    this.getUsers();
  }

  onClickHandler3 = () => {
    console.log('ONCLICK3');
    console.log(JSON.stringify(this.state.answered));
    const options = {
      url: '/sync',
      method: 'POST',
      data: JSON.stringify(this.state.answered),
    };
    axios(options).then(() => {
      console.log('SYNC');
    });
  }

  onClickHandler2 = () => {
    this.setState({
      username: '',
      page: 1,
      users: [],
      // value: [],
      leaderboard: [],
      score: 0,
      ques: [],
      answered: [],
      ctr: 0,
    });
    this.getUsers();
  }

  onClickHandler1 = () => {
    const options = {
      url: '/users',
      method: 'POST',
      data: {
        username: this.state.username,
        score: this.state.score,
      },
    };
    axios(options).then(() => {
      axios.get('/leaderboard').then((leaders) => {
        this.setState({
          page: 3,
          leaderboard: leaders.data,
        });
      });
    });
  }

  onChangeHandler1 = (event, quesid) => {
    event.persist();
    console.log(`here ${event.target.value} ${quesid}`);
    let i;
    for (i = 0; i < this.state.ques.length; i += 1) {
      if (this.state.ques[i].quesid === quesid) {
        break;
      }
    }
    console.log(`i: igi ${i}`);
    let flag = 0;
    let j;
    for (j = 0; j < this.state.answered.length; j += 1) {
      console.log('inside for');
      if (this.state.answered[j].quesid === quesid && this.state.answered[j].rt === true) {
        flag = 1;
        break;
      } else if (this.state.answered[j].quesid === quesid && this.state.answered[j].rt !== true) {
        flag = 2;
        break;
      }
    }
    console.log(`j: kjbkhb: ${j}`);
    if (event.target.value === this.state.ques[i].correctans) {
      console.log('here1');
      if (j !== this.state.answered.length && flag === 2) {
        console.log('here2');
        const temp = this.state.answered;
        temp[j].rt = true;
        temp[j].option = event.target.value;
        temp[j].username = this.state.username;
        const options = {
          url: '/users',
          method: 'POST',
          data: {
            username: this.state.username,
            score: this.state.score + 1,
          },
        };
        axios(options).then(() => {
          const options1 = {
            url: '/sync',
            method: 'POST',
            data: JSON.stringify(temp),
          };
          axios(options1).then(() => {
            console.log('Score saved!');
            this.setState({
              answered: temp,
              score: this.state.score + 1,
            });
          });
        });
      } else if (j !== this.state.answered.length && flag === 1) {
        const temp = this.state.answered;
        temp[j].rt = true;
        temp[j].option = event.target.value;
        temp[j].username = this.state.username;
        const options = {
          url: '/sync',
          method: 'POST',
          data: JSON.stringify(temp),
        };
        axios(options).then(() => {
          console.log('here3');
          this.setState({
            answered: temp,
            ctr: this.state.ctr + 1,
          });
        });
      } else if (j === this.state.answered.length) {
        console.log('here4');
        const options = {
          url: '/users',
          method: 'POST',
          data: {
            username: this.state.username,
            score: this.state.score + 1,
          },
        };
        axios(options).then(() => {
          const options1 = {
            url: '/sync',
            method: 'POST',
            data: JSON.stringify(this.state.answered.concat({
              quesid,
              rt: true,
              option: event.target.value,
              username: this.state.username,
            })),
          };
          axios(options1).then(() => {
            console.log('Score saved!');
            this.setState({
              answered: this.state.answered.concat({
                quesid,
                rt: true,
                option: event.target.value,
                username: this.state.username,
              }),
              score: this.state.score + 1,
            });
          });
        });
      }
    }
    if (event.target.value !== this.state.ques[i].correctans) {
      console.log(`here5: j: ${j}`);
      if (j !== this.state.answered.length && flag === 2) {
        const temp = this.state.answered;
        temp[j].rt = false;
        temp[j].option = event.target.value;
        temp[j].username = this.state.username;
        const options = {
          url: '/sync',
          method: 'POST',
          data: JSON.stringify(temp),
        };
        axios(options).then(() => {
          console.log('here6');
          this.setState({
            answered: temp,
            ctr: this.state.ctr,
          });
        });
      } else if (j !== this.state.answered.length && flag === 1) {
        console.log('here7');
        const temp = this.state.answered;
        temp[j].rt = false;
        temp[j].option = event.target.value;
        temp[j].username = this.state.username;
        const options = {
          url: '/users',
          method: 'POST',
          data: {
            username: this.state.username,
            score: this.state.score - 1,
          },
        };
        axios(options).then(() => {
          console.log('Users');
          const options1 = {
            url: '/sync',
            method: 'POST',
            data: JSON.stringify(temp),
          };
          axios(options1).then(() => {
            console.log('Score saved!');
            this.setState({
              answered: temp,
              score: this.state.score - 1,
            });
          });
        });
      } else if (j === this.state.answered.length) {
        const options = {
          url: '/sync',
          method: 'POST',
          data: JSON.stringify(this.state.answered.concat({
            quesid,
            rt: false,
            option: event.target.value,
            username: this.state.username,
          })),
        };
        axios(options).then(() => {
          console.log('here8');
          this.setState({
            answered: this.state.answered.concat({
              quesid,
              rt: false,
              option: event.target.value,
              username: this.state.username,
            }),
          });
        });
      }
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      username: `${event.target.value}`,
    });
  }

  onClickHandler = () => {
    // axios.post('/users').then((allUsers) => {
    //   console.log(allUsers);
    let flag = 0;
    for (let i = 0; i < this.state.users.length; i += 1) {
      if (this.state.users[i].username === this.state.username) {
        flag = 1;
        break;
      }
    }
    if (flag === 1) {
      console.log('no');
      const options = {
        url: `/sync/${this.state.username}`,
        method: 'GET',
      };
      axios(options).then((state) => {
        axios.get(`/score/${this.state.username}`).then((scores) => {
          this.setState({
            ...this.state,
            score: scores.data[0].score,
            answered: state.data,
            page: 2,
          });
        });
      });
      // axios.get('/state').then((state) => {

      // })
    } else {
      const options = {
        url: '/users',
        method: 'POST',
        data: {
          username: this.state.username,
          score: this.state.score,
        },
      };
      axios(options).then(() => {
        console.log('User created!');
      });
      this.setState({
        //   users: this.state.users.push(allUsers.data),
        page: 2,
      });
    }
    // });
  }

  //   setLeaders = (leaders) => {
  //     this.setState({
  //       leaders: [].concat(leaders),
  //     });
  //   }

  getUsers = () => {
    axios.get('/users').then((allUsers) => {
      axios.post('/ques').then(() => {
        axios.get('/ques').then((allQues) => {
          this.setState({
            users: allUsers.data,
            ques: allQues.data,
          });
        });
      });
    });
  }

  render() {
    if (this.state.page === 1) {
      return (
        <View className="Container-contain">
          <LoginCard
            onClick={() => this.onClickHandler()}
            onChange={event => this.onChangeHandler(event)}
            username={this.state.username}
          />
        </View>
      );
    } else if (this.state.page === 2) {
      const rows = [];
      for (let i = 0; i < this.state.ques.length; i += 1) {
        rows.push(<QuestionCard
          qno={i + 1}
          username={this.state.username}
          ques={this.state.ques[i]}
          answered={this.state.answered}
          score={this.state.score}
          onChange={(event, quesid) => this.onChangeHandler1(event, quesid)}
        />);
      }

      const buttn = this.state.answered.length === 12 ?
        (<Button onPress={() => { this.onClickHandler1(); }} title="Calculate" />) :
        (<Button title="Calculate" />);

      return (
        <View>
          <View className="Container-ques">
            {rows}
          </View>
          <View className="Container-btn">
            {/* <button onClick={() => { this.onClickHandler1(); }}>Calculate</button> */}
            {buttn}
          </View>
        </View>
      );
    }
    const rows = [];
    for (let i = 0; i < this.state.leaderboard.length; i += 1) {
      rows.push(<View className="Container-leaders">
        <Text className="Container-username"><Text className="Container-leaders-black">{i + 1}.</Text>
          <Text className={this.state.username === this.state.leaderboard[i].username ? 'Container-userRED' : ''}>{this.state.leaderboard[i].username}</Text>
        </Text>
        <Text className="Container-scores">{this.state.leaderboard[i].score}</Text>
                </View>);
    }

    return (
      <View>
        <View className="Container-usr">
          Hello {this.state.username}
        </View>
        <View className="Container-pg3">
          <View className="Container-text">
              Your Score
          </View>
          <View className="Container-score">
            {this.state.score}<Text className="Container-sl">/{this.state.answered.length}</Text>
          </View>
          <View className="Container-leaderboard">
            {rows}
          </View>
        </View>
        <View className="Container-playagain">
          <button onClick={() => { this.onClickHandler2(); }}>Play Again</button>
        </View>
      </View>
    );
  }
}

export default Container;

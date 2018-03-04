import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
// import fetch from 'fetch';
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
      method: 'POST',
      data: JSON.stringify({
        username: this.state.username,
        score: this.state.score,
      }),
    };
    fetch('http://localhost:8000/users', options).then(() => {
      fetch('http://localhost:8000/leaderboard').then(response => response.json()).then((leaders) => {
        this.setState({
          page: 3,
          leaderboard: leaders,
        });
      });
    });
  }

  onChangeHandler1 = (value, quesid) => {
    // event.persist();
    console.log(`here ${value} ${quesid}`);
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
    if (value === this.state.ques[i].correctans) {
      console.log('here1');
      if (j !== this.state.answered.length && flag === 2) {
        console.log('here2');
        const temp = this.state.answered;
        temp[j].rt = true;
        temp[j].option = value;
        temp[j].username = this.state.username;
        const options = {
          method: 'POST',
          body: JSON.stringify({
            username: this.state.username,
            score: this.state.score + 1,
          }),
        };
        fetch('http://localhost:8000/users', options).then(() => {
          const options1 = {
            method: 'POST',
            body: JSON.stringify(temp),
          };
          fetch('http://localhost:8000/sync', options1).then(() => {
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
        temp[j].option = value;
        temp[j].username = this.state.username;
        const options = {
          method: 'POST',
          body: JSON.stringify(temp),
        };
        fetch('http://localhost:8000/sync', options).then(() => {
          console.log('here3');
          this.setState({
            answered: temp,
            ctr: this.state.ctr + 1,
          });
        });
      } else if (j === this.state.answered.length) {
        console.log('here4');
        const options = {
          method: 'POST',
          body: JSON.stringify({
            username: this.state.username,
            score: this.state.score + 1,
          }),
        };
        fetch('http://localhost:8000/users', options).then(() => {
          const options1 = {
            method: 'POST',
            body: JSON.stringify(this.state.answered.concat({
              quesid,
              rt: true,
              option: value,
              username: this.state.username,
            })),
          };
          fetch('http://localhost:8000/sync', options1).then(() => {
            console.log('Score saved!');
            this.setState({
              answered: this.state.answered.concat({
                quesid,
                rt: true,
                option: value,
                username: this.state.username,
              }),
              score: this.state.score + 1,
            });
          });
        });
      }
    }
    if (value !== this.state.ques[i].correctans) {
      console.log(`here5: j: ${j}`);
      if (j !== this.state.answered.length && flag === 2) {
        const temp = this.state.answered;
        temp[j].rt = false;
        temp[j].option = value;
        temp[j].username = this.state.username;
        const options = {
          method: 'POST',
          body: JSON.stringify(temp),
        };
        fetch('http://localhost:8000/sync', options).then(() => {
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
        temp[j].option = value;
        temp[j].username = this.state.username;
        const options = {
          method: 'POST',
          body: JSON.stringify({
            username: this.state.username,
            score: this.state.score - 1,
          }),
        };
        fetch('http://localhost:8000/users', options).then(() => {
          console.log('Users');
          const options1 = {
            method: 'POST',
            body: JSON.stringify(temp),
          };
          fetch('http://localhost:8000/sync', options1).then(() => {
            console.log('Score saved!');
            this.setState({
              answered: temp,
              score: this.state.score - 1,
            });
          });
        });
      } else if (j === this.state.answered.length) {
        const options = {
          method: 'POST',
          body: JSON.stringify(this.state.answered.concat({
            quesid,
            rt: false,
            option: value,
            username: this.state.username,
          })),
        };
        fetch('http://localhost:8000/sync', options).then(() => {
          console.log('here8');
          this.setState({
            answered: this.state.answered.concat({
              quesid,
              rt: false,
              option: value,
              username: this.state.username,
            }),
          });
        });
      }
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      username: event,
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
      fetch(`http://localhost:8000/sync/${this.state.username}`).then(response => response.json()).then((state) => {
        fetch(`http://localhost:8000/score/${this.state.username}`).then(response => response.json()).then((scores) => {
          this.setState({
            ...this.state,
            score: scores[0].score,
            answered: state,
            page: 2,
          });
        });
      });
      // fetch('http://localhost:8000/state').then((state) => {

      // });
    } else {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.username,
          score: this.state.score,
        }),
      };
      fetch('http://localhost:8000/users', options).then(response => response.text()).then(() => {
        console.log('User created!');
        this.setState({
          //   users: this.state.users.push(allUsers.data),
          page: 2,
        });
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
    fetch('http://localhost:8000/users').then(response => response.json()).then((allUsers) => {
      // console.log(allUsers);
      fetch('http://localhost:8000/ques').then(response => response.json()).then((allQues) => {
        this.setState({
          users: this.state.users.concat(allUsers),
          ques: this.state.ques.concat(allQues),
        });
      }).then(() => {
        if (this.state.ques.length === 0) {
          const options = {
            method: 'POST',
          };
          fetch('http://localhost:8000/ques', options).then(() => {
            fetch('http://localhost:8000/ques').then(response => response.json()).then((allQues) => {
              this.setState({
                users: this.state.users.concat(allUsers),
                ques: this.state.ques.concat(allQues),
              });
            });
          });
        }
      });
    });
  }

  render() {
    if (this.state.page === 1) {
      return (
        <View className="Container-contain" style={styles.ContainerContain}>
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
          key={i}
          qno={i + 1}
          username={this.state.username}
          ques={this.state.ques[i]}
          answered={this.state.answered}
          score={this.state.score}
          onChange={(value, quesid) => this.onChangeHandler1(value, quesid)}
        />);
      }

      const buttn = this.state.answered.length === this.state.ques.length ?
        (<Button onPress={() => { this.onClickHandler1(); }} title="Calculate" />) :
        (<Button title="Calculate" onPress={() => {}} />);

      return (
        <View>
            <Text style={styles.ContainerUsername}>Hello {this.state.username}</Text>
            <ScrollView>
              <View className="Container-ques" style={styles.ContainerQues}>
            {rows}
              </View>
          <View className="Container-btn" style={styles.ContainerBtn}>
            {/* <button onClick={() => { this.onClickHandler1(); }}>Calculate</button> */}
            {buttn}
          </View>
            </ScrollView>
        </View>
      );
    }
    const rows = [];
    for (let i = 0; i < this.state.leaderboard.length; i += 1) {
      rows.push(<View key={i} className="Container-leaders" style={styles.ContainerLeaders}>
        <Text className="Container-username"><Text className="Container-leaders-black" style={styles.ContainerLeadersBlack}>{i + 1}.</Text>
          <Text style={this.state.username === this.state.leaderboard[i].username ? styles.ContainerUserRED : ''}> {this.state.leaderboard[i].username}</Text>
        </Text>
        <Text className="Container-scores" style={styles.ContainerScores}>{this.state.leaderboard[i].score}</Text>
                </View>);
    }

    return (
      <View>
        <View className="Container-usr">
        <Text style={styles.ContainerUsername}>Hello {this.state.username}</Text>
        </View>
        <View className="Container-pg3">
          <View className="Container-text">
              <Text style={styles.ContainerText}>Your Score</Text>
          </View>
          <View className="Container-score">
            <Text style={styles.ContainerScore}>{this.state.score}</Text><Text className="Container-sl" style={styles.Containersl}>/{this.state.answered.length}</Text>
          </View>
          <View className="Container-leaderboard" style={styles.ContainerLeaderboard}>
            {rows}
          </View>
        </View>
        <View className="Container-playagain" style={styles.ContainerPlayagain}>
          <Button onPress={() => { this.onClickHandler2(); }} title="Play Again" />
        </View>
      </View>
    );
  }
}

export default Container;

import React, { Component } from 'react';
import { io } from 'socket.io-client'
import getData from '../getData';

import Feed from './Feed';
import UserInfo from './UserInfo';

class AppState {
  socket;
  users;
  feed;
  messageCount;
  constructor() {
    this.feed = [];
    this.users = [];
    this.messageCount = 0;
    this.socket = undefined;
  }
}

class App extends Component {
  state;
  constructor(props) {
    super(props);
    this.state = new AppState();
  }

  componentDidMount() {
      getData('/api/getFeed')
      .then((data) => {
        let feed = data.feed;
        feed.reverse();
        this.setState({feed})
      });
      getData('/api/getMessageTotal')
      .then((data) => {
        this.setState({messageCount:data.messageCount});
      });
      getData('/api/getUsers')
      .then((data) => {
        this.setState({users:data.users});
      });

      const newSocket = io("http://localhost:3002/");
      newSocket.on('feedUpdate', (data) => {
        let feed = [...this.state.feed];
        feed.push(data);
        if(feed.length > 10) {
          feed.splice(0, 1);
        }
        let users = [...this.state.users];
        for(let i = 0; i < users.length; i++) {
          if(users[i].id === data.userid) {
            users[i].messageCount++;
          }
        }
        this.setState({
          feed,
          messageCount: this.state.messageCount + 1
        });
      });
      this.setState({socket:newSocket});
  }

  componentWillUnmount() {
      let s = this.state.socket;
      if(s !== undefined) s.disconnect();
  }

  render() {
    return(
      <div className="container">
        <UserInfo
          users={this.state.users}/>
        <Feed 
          feed={this.state.feed}
          messageCount={this.state.messageCount} />
      </div>
    )
  }
}

export default App;

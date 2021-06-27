import React, { Component } from 'react';
import '../css/feed.scss';

import send from '../images/send.png';

class FeedState { 
    messageText;
    selectedUser;
    constructor() {
        this.messageText = '';
        this.selectedUser = '1';
    }
}

class Feed extends Component {
    state;
    bottom;
    constructor(props){
        super(props);
        this.state = new FeedState();
        this.bottom = React.createRef();
    }
    setSelected(e) {
        this.setState({
            selectedUser:e.target.value
        })
    }
    isSelected(val) {
        return this.state.selectedUser === val;
    }
    setMessage(e) {
        this.setState({
            messageText: e.target.value
        })
    }
    sendMessage() {

        if(this.state.messageText === '') return;
        let message = {
            userid:this.state.selectedUser,
            text:this.state.messageText,
            timestamp:new Date().getTime()
        };

        fetch('http://localhost:3002/api/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message)
        }).then(() => {
            this.setState({messageText:''})
        });
    }

    componentDidUpdate(prevProps) {
        if(this.props.feed !== prevProps.feed) {
            if(this.bottom.current) {
                this.bottom.current.scrollIntoView();
            }
        }
    }

    render() {
        return(
            <div className="feed-container">
                <div className="feed-header">
                    Total Messages: {this.props.messageCount}
                </div>
                <div className="feed-messages">
                    {
                    this.props.feed.map((message) => 
                        <div 
                            className="message"
                            key={message.timestamp}>
                            <div className="message-info">
                                <div className="message-user">
                                    {'User ' + message.userid}
                                </div>
                                <div className="message-time">
                                    {new Date(parseInt(message.timestamp)).toLocaleString()}
                                </div>
                            </div>
                            <div className="message-text">
                                {message.text}
                            </div>
                        </div>
                    )}
                    <div className="bottom" ref={this.bottom}></div>
                </div>
                <div className="feed-input">
                    <div className="feed-textbox-cont center">
                        <textarea 
                            name="message-input" 
                            placeholder="Message here..."
                            id="message-input"
                            value={this.state.messageText}
                            onChange={(e) => this.setMessage(e)}></textarea>
                    </div>
                    <div className="feed-control">
                        <div className="feed-user-select">
                            <label htmlFor="user 1">
                                <input 
                                    name="user 1" 
                                    type="radio" 
                                    value="1"
                                    checked={this.isSelected("1")}
                                    onChange={(e) => this.setSelected(e)}/>
                                User 1
                            </label>
                            <label htmlFor="user 2">
                                <input 
                                    name="user 2" 
                                    type="radio" 
                                    value="2"
                                    checked={this.isSelected("2")}
                                    onChange={(e) => this.setSelected(e)}/>
                                User 2
                            </label>
                            <label htmlFor="user 3">
                                <input 
                                    name="user 3" 
                                    type="radio" 
                                    value="3"
                                    checked={this.isSelected("3")}
                                    onChange={(e) => this.setSelected(e)}/>
                                User 3
                            </label>
                        </div>
                        <div className="feed-send center">
                            <div 
                                className="send-btn"
                                onClick={() => this.sendMessage()}>
                                <img src={send} alt="send"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Feed;
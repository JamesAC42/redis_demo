import React, { Component } from 'react';
import '../css/userinfo.scss';

class UserInfo extends Component {
    render() {
        return(
            <div className="user-info">
                {
                this.props.users.map((user) => 
                    <div
                        key={user.id} 
                        className="user">
                        <div className="user-id">User ID: {user.id}</div>
                        <div className="user-name">User Name: {user.name}</div>
                        <div className="message-count">Message Count: {user.messageCount}</div>
                    </div>
                )
                }
            </div>
        )
    }
}

export default UserInfo;
import React, { Component } from 'react';

class CounterState {
    count;
    constructor(){
        this.count = 0;
    }
}

class Counter extends Component {
    state;
    constructor(props) {
        super(props);
        this.state = new CounterState();
    }
    increment() {
        this.setState({ count: this.state.count + 1 });
    }
    decrement() {
        this.setState({ count: this.state.count - 1});
    }
    render() {
        return(
            <div className="counter-outer">
                <div className="counter-value">
                    {this.state.count}
                </div>
                <div className="counter-buttons">
                    <div 
                        className="decrement"
                        onClick={() => this.decrement()}>
                        -
                    </div>
                    <div 
                        className="increment"
                        onClick={() => this.increment()}>
                        +
                    </div>
                </div>
            </div>
        )
    }
}

export default Counter;
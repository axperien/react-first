import React from 'react';

export default class StopClock extends React.Component {
    constructor() {
        super();
        this.state = {
            currentTime: new Date(),
            timer: setInterval(() => this.timerTick(this.state.currentTime), 1000),
            isStopped: false
        }
    }

    timerTick = date => {
        this.setState({
            currentTime: new Date(date.setSeconds(date.getSeconds() + 1))
        });
    }

    stopTime = () => {
        clearInterval(this.state.timer);
        this.setState(prevState => ({
            currentTime: prevState.currentTime,
            isStopped: !prevState.isStopped
          }));
    }

    startTime = () => {
        if(this.state.isStopped) {
            this.setState({
                timer:  setInterval(() => this.timerTick(this.state.currentTime), 1000)
            });
        }
    }

    resetTime() {
        clearInterval(this.state.timer);
        this.setState(prevState => ({
            currentTime: prevState.currentTime,
            isStopped: !prevState.isStopped,
            timer:  setInterval(() => this.timerTick(new Date()), 1000)
          }));
    }

    render() {
        return (
            <div className="counter">
                <div className="counter-time">
                    {this.state.currentTime.toLocaleTimeString()}
                </div>
                <div className="counter-buttons">
                    <button onClick={() => this.stopTime()}>Stop</button>
                    <button onClick={() => this.startTime()}>Start</button>
                    <button onClick={() => this.resetTime()}>Reset</button>
                </div>
            </div>
        )
    }
}
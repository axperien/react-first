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

    startTime = (date = this.state.currentTime) => {
        if (this.state.isStopped) {
            this.setState({
                isStopped: false,
                timer: setInterval(() => this.timerTick(date), 1000)
            });
        }
    }

    // resetTime() {
    //     clearInterval(this.state.timer);
    //     this.setState(prevState => ({
    //         currentTime: prevState.currentTime,
            
    //         timer: setInterval(() => this.timerTick(new Date()), 1000)
    //     }));
    // }

    render() {
        return ( 
            <div className="counter">
                <div className="counter-title">
                    It's timer. Goog luck. :)
                </div>
                <div className="counter-time"> 
                    {this.state.currentTime.toLocaleTimeString()}
                </div>
                <div className="counter-status">
                    {this.state.isStopped 
                        ? (<span>Time current stop</span>) 
                        : (<span>Time current started</span>) }
                </div>
                <div className="counter-buttons">
                    <button onClick = {() => this.stopTime()} className="counter-button"> Stop </button> 
                    <button onClick = {() => this.startTime()} className="counter-button"> Start </button>
                    <button onClick = {() => this.startTime(new Date())} className="counter-button"> Reset </button>
                </div> 
            </div>
        )
    }
}
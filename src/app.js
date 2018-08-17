import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

moment.locale("ru");

export default class StopClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: moment(),
            interval: 1000,
            isStopped: true
        };
        this.changeTime = this.changeTime.bind(this);
    }

    timerTick = date => {
        this.timer = setInterval(() => 
            this.changeTime(date.add(1, 's')), this.state.interval)
    }

    stopTime = () => {
        clearInterval(this.timer);
        this.setState({isStopped: true});
    }

    startTime = (date) => {
        if (this.state.isStopped) {
            const newDate = date || this.state.currentTime;
            this.setState({isStopped: false});
            this.timerTick(newDate);
        }
    }

    resetTime = () => {
        if (this.state.isStopped) 
            this.changeTime(moment())
    }

    changeTime = date => {
        console.log(date)
        this.setState({currentTime: date})
    };

    render() {
        return ( 
            <div className="counter">
                <div className="counter-title">
                    It`s timer. Good luck. :)
                </div>
                <div className="counter-time"> 
                    {this.state.currentTime.format('Do MMMM YYYY, HH:mm:ss')}
                </div>
                <div className="counter-status">
                    {this.state.isStopped 
                        ? (<span style={{color: 'red'}}>Time current stop</span>) 
                        : (<span style={{color: 'green'}}>Time current started</span>) }
                </div>
                <div className="counter-buttons">
                    <button onClick = {() => this.stopTime()} className="counter-button">Stop</button> 
                    <button onClick = {() => this.startTime()} className="counter-button">Start</button>
                    {this.state.isStopped 
                        ? (<button onClick = {() => this.resetTime()} className="counter-button">Reset</button>) 
                        : (<button  className="counter-button counter-button__disabled">Reset</button>)}                     
                </div> 
                <div className="datepicker">
                    <div className="datepicker-title">Choose your time:</div>
                    <DatePicker
                        selected={this.state.currentTime}
                        onChange={this.changeTime}
                        disabled={!this.state.isStopped}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                    />
                </div>
            </div>
        )
    }
}
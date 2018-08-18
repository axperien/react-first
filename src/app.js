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
            currentDate: moment(),
            interval: 1000,
            isStopped: true
        };
    }

    timerTick = (date) => {
        this.timer = setInterval(() => 
            this.changeDate(date.add(1, 's')), this.state.interval);
    }

    changeDate = (date) => 
        this.setState({currentDate: date});
    
    handlerStopDate = () => {
        clearInterval(this.timer);
        this.setState({isStopped: true});
    }

    handlerStartDate = () => {
        const { isStopped, currentDate } = this.state;

        if (isStopped) {
            this.setState({isStopped: false});
            this.timerTick(currentDate);
        }
    }

    handlerResetDate = () => {
        if (this.state.isStopped) 
            this.changeDate(moment());
    }

    handlerChooseUserDate = (date) => 
        this.changeDate(date.set({second:0,millisecond:0}));

    handlerSetInterval = (e) => {
        this.setState({interval: e.currentTarget.value});
    }

    render() {
        const { isStopped, currentDate, interval } = this.state;

        return ( 
            <div className="counter">
                <div className="counter__title">
                    It`s date timer. Good luck. :)
                </div>
                <div className="counter__time"> 
                    {currentDate.format('Do MMMM YYYY, HH:mm:ss')}
                </div>
                <div className="counter__status">
                    {isStopped 
                        ? (<span style={{color: 'red'}}>Time current stop</span>) 
                        : (<span style={{color: 'green'}}>Time current started</span>) }
                </div>
                <div className="counter__buttons">
                    <button onClick = {() => this.handlerStopDate()} className="counter__button">Stop</button> 
                    <button onClick = {() => this.handlerStartDate()} className="counter__button">Start</button>
                    <button onClick = {() => this.handlerResetDate()} disabled={!isStopped} className="counter__button">Reset</button>                   
                </div> 
                <div>
                    <div className="title">Change timer interval</div>
                    <select 
                        onChange={this.handlerSetInterval}
                        value={interval}
                        disabled={!isStopped}
                        >
                        <option>1000</option>
                        <option>500</option>
                        <option>100</option>
                    </select>
                </div>
                <div className="datepicker">
                    <div className="title">Choose your time:</div>
                    <DatePicker
                        selected={currentDate}
                        onChange={this.handlerChooseUserDate}
                        disabled={!isStopped}
                        showTimeSelect
                        timeFormat="HH:mm:ss"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                    />
                </div>
            </div>
        )
    }
}
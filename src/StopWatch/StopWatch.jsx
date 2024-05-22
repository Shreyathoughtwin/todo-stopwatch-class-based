
import React from 'react';
import './StopWatch.css';

class StopWatch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            running: false,
            mins: 0,
            secs: 0,
            msecs: 0,
            data: [],
        showStart:true,
        showStop:false,
        showResume:false,
        shoeReset:false,

 };
        this.timer = null;

}
         handleStartTimer = () => {

        this.setState({showReset:true , showResume:true , showStop:true})
        if (!this.state.running) {

            // console.log('starting the timer');
     this.timer = setInterval(() => {
                this.setState((prevState) => {

     let { mins, secs, msecs } = prevState;
                    msecs += 1;

            if (msecs >= 100) {
                        msecs = 0;
                        secs += 1;
}
             if (secs >= 60) {
                        secs = 0;
                        mins += 1;
}
                 return { mins, secs, msecs };
                 });

 }, 10);

         this.setState((prevState) => ({
                running: true,

                // data: [...prevState.data, { action: 'start', time: new Date().toLocaleString() }]
    }));

 }
}
    handleStop = () => {

               this.setState({showStart:false})

        if (this.state.running) {
            //     console.log('stop the timer');
            clearInterval(this.timer);
            this.setState((prevState) => ({

                running: false,
                data: [...prevState.data, { action: 'stop', time: new Date().toLocaleString() }]

      }));
     }
 }

    handleReset = () => {
        this.setState({showStart:true , showReset:false , showStop:false})
        clearInterval(this.timer);

        // console.log('reset the timer');
        this.setState((prevState) => ({
            running: false,
            mins: 0,
            secs: 0,
            msecs: 0,

            // data: [...prevState.data, { action: 'reset', time: new Date().toLocaleString() }]
}));

 }

    handleResume = () => {
        this.handleStartTimer();
        this.setState((prevState) => ({
            data: [...prevState.data, { action: 'resume', time: new Date().toLocaleString() }]
 }));

        // }
 }
    //   method format check
         formatNumber = (num) => {
        return num < 10 ? '0' + num : num;
  }

    render() {
        
        const { running, mins, secs, msecs, data } = this.state;
        return (
         <div className="stop-watch">
                <div className="time-display">
                    <span>{this.formatNumber(mins)}</span>:
                    <span>{this.formatNumber(secs)}</span>:
                    <span>{this.formatNumber(msecs)}</span>
            </div>

 {
      this.state.showStart ?  <button className="control" onClick={this.handleStartTimer} disabled={running}>Start</button>:null
     }

        {
         this.state.showStop ?  <button className="control" onClick={this.handleStop} disabled={!running}>Stop</button>:null
         }

    {
        this.state.showResume ? <button className="control" onClick={this.handleResume} disabled={running || (mins === 0 && secs === 0 && msecs === 0)}>Resume</button>:null
     }
                {
                this.state.showReset ?<button className="control" onClick={this.handleReset}>Reset</button> :null
                }


                {/* <div className="data"> */}
                <div className="data">
                    <h3>Data</h3>
                    <ul>

                        {data.map((entry, index) => (
                            <li key={index}>{entry.action} at {entry.time}</li>))}
        </ul>
                    </div>

            </div>
    );
 }
}

export default StopWatch
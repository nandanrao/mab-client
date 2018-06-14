import React, {Component} from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date() };
  }

  componentDidMount() {
    this.startTime();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTime() {
    this.timer = setInterval(() => {
      this.setState(() => ({ time: new Date() }));
    }, 1000);
  }

  render() {
    const formatSeconds = s => s > 9 ? s : '0'+s;
    const d = new Date(this.state.time - new Date(this.props.start))

    return (
      <div className="timer"> <h3> Time Played: <span>{d.getMinutes()}:{formatSeconds(d.getSeconds())} </span></h3> </div>
    )
  }
}

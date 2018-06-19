import React, {Component} from 'react';

export default class Guess extends Component {

  constructor(props) {
    super(props)
    this.state = { prob: 50 }
  }

  onChange = (val) => (e) => {
    this.setState({ [val]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.submit({...this.state})
  }

  render() {
    const {winnings,plays,next} = this.props;

    return (
      <div className="question">
        <p>
          You won ${winnings}.
        </p>
        <p>
        If you had the option to play a { next } round (with another {plays} boxes), what do you think the probability is that you will win a green gem in that round?
        </p>
        <form onSubmit={this.onSubmit}>
          <span> 0% </span> <input onChange={ this.onChange('prob') } value={this.state.prob} type="range" min="0" max="100" /><span> 100% </span>
          <h3> {this.state.prob}% </h3>
          <button type="submit"> submit </button>
        </form>
      </div>
    )
  }
}

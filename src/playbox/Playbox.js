import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import './Playbox.css';
import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee';
import faDove from '@fortawesome/fontawesome-free-solid/faDove';
import faKiwiBird from '@fortawesome/fontawesome-free-solid/faKiwiBird';
import faFeather from '@fortawesome/fontawesome-free-solid/faFeather';
import faFrog from '@fortawesome/fontawesome-free-solid/faFrog';
import faGem from '@fortawesome/fontawesome-free-solid/faGem';
import faSkull from '@fortawesome/fontawesome-free-solid/faSkull';
import random from '../random';

export default class Playbox extends Component {
  constructor() {
    super();
    this.icons = [faFrog, faFeather, faKiwiBird, faDove]
    this.state = { icon: this.icons[random.integer(0,3)] };
  }

  flipIcon =  () => {
    const len = this.icons.length - 1;
    const curr = this.icons.indexOf(this.state.icon);
    const nxt = curr < len ? curr + 1 : 0;
    this.setState({ icon: this.icons[nxt] });
  }

  roll = () => {
    let res;
    if (typeof this.props.outcome === 'string') {
      res = this.props.outcome
    }
    else {
      const prob = this.props.outcome;
      res = random.bool(prob) ? 'win' : 'lose';
    }
    this.props.report(res)
  }

  click = () => {
    const rate = 1.5
    const l = 14
    const times = [...Array(l).keys()].reduce((a,b) => [...a,  a.pop()*rate ], [2])
    times.forEach(i => {
      setTimeout(this.flipIcon, i);
    })
    const lst = times.slice().pop();
    setTimeout(this.roll, lst*rate)
  }

  render() {
    let icon, color, disabled;

    if (this.props.result) {
      [icon, color, disabled] = this.props.result === 'win'
        ? [faGem, 'green', true]
        : [faSkull, 'red', true];
    }
    else {
      [icon, color, disabled] = [this.state.icon, 'inherit', false]
    }

    return <button className="playbox" disabled={!!this.props.result} style={{ color: color, borderColor: color }} onClick={this.click.bind(this)}> <FontAwesomeIcon icon={ icon } size="2x" /> </button>
  }
}

import React, {Component} from 'react';
import {boxPlayed} from '../actions';
import Playbox from './Playbox';
import './BoxPair.css'

export default class BoxPair extends Component {
  constructor(props) {
    super(props)
    this.state = { rolling: null }
  }

  render() {
    const {boxes, idx, round} = this.props

    const rolling = (idx) => {
      this.setState({rolling: idx})
    }

    return <div className="boxpair">
      { boxes.map((b,j) => {
        const disabled = (this.state.rolling !== null && this.state.rolling !== j) || b.disabled;
        return <Playbox key={j}
        rolling={rolling.bind(this,j)}
        report={boxPlayed.bind(this, round, idx, j)}
        result={b.result}
        value={b.value}
        outcome={b.outcome}
        disabled={ disabled }/>

      }) }
    </div>
  }
}

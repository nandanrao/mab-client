import React from 'react';
import Playbox from '../playbox/Playbox';
import {push} from 'react-router-redux';
import {store} from '../store';
import qs from 'query-string';

import random from 'random-js'
// create state such that we know how many boxes have been clicked
// and the outcome of the boxes!!
// disable the continue button until all boxes clicked.

export default (props) => {
  const round = qs.parse(props.location.search).round

  const report = (i, res) => {
    store.dispatch({type: 'BOX_PLAYED', round: round, idx: i, result: res })
  }

  const boxes = props.boxes[round].map((b,i) => <Playbox key={i} report={report.bind(this, i)} result={b.result} outcome={b.outcome}/>)

  console.log('rendering', boxes)

  return <div className="play">
    <p>
    Play the game!
    </p>
    <div className="boxes">
    {boxes}
  </div>
    <button className="accept" onClick={() => store.dispatch(push('/'))}> continue </button>
    </div>
}

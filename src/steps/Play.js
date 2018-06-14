import React from 'react';
import Playbox from '../playbox/Playbox';
import Timer from './Timer';
import {push} from 'react-router-redux';
import {store} from '../store';
import qs from 'query-string';
import {boxPlayed, addBox} from '../actions';
import {getWinnings} from '../utils';
import random from '../random';


export default (props) => {

  const handleClick = () => {
    if (window.confirm('Are you sure you want to quit?')) {
      store.dispatch(push(`/question?q=${4}`))
    }
  }

  const round = 1
  const boxes = props.boxes[round]

  if (!boxes) {
    store.dispatch(push('/'))
    return null
  }

  let idx = boxes.length - 1
  const box = boxes[idx]
  const winnings = getWinnings(boxes)

  if (winnings > 0) {
    setTimeout(() => store.dispatch(push(`/question?q=${4}`)), 500)
  }

  const report = (result) => {
    boxPlayed(round, idx, result, props.treatment, true);
  }


  const playBox = <Playbox report={report} key={idx} result={box.result} outcome={box.outcome } speed={props.boxSpeed } />

  return <div className="play">
    <p>
       Hint: you can also press the spacebar instead of clicking.
    </p>
    <p>
    Good luck!
    </p>
    <div className="box">
    { playBox}
  </div>
    <Timer start={boxes[0].timestamp} />
    <button className="accept" onClick={handleClick}> quit </button>
    </div>
}

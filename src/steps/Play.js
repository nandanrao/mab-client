import React from 'react';
import Playbox from '../playbox/Playbox';
import {push} from 'react-router-redux';
import {store} from '../store';
import qs from 'query-string';
import {boxPlayed, addBox} from '../actions';
import random from '../random';


export default (props) => {

  const handleClick = () => {
    if (window.confirm('Are you sure you want to quit?')) {
      store.dispatch(push(`/question?q=${4}`))
    }
  }

  const round = 1;

  let idx = props.boxes[round].length - 1

  if (props.transitioning) {
    idx = Math.max(idx - 1, 0)
  }

  const box = props.boxes[round][idx]

  const report = (result) => {
    boxPlayed(round, idx, result);
    addBox(round, props.treatment);
  }

  const playBox = <Playbox report={report} key={idx} result={box.result} outcome={box.outcome }/>

  return <div className="play">
    <p>
       Hint: you can also press the spacebar instead of clicking.
    </p>
    <p>
    Good luck!
    </p>
    <div className="box">
    {playBox}
  </div>
    <button className="accept" onClick={handleClick}> quit </button>
    </div>
}

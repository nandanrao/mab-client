import React from 'react';
import Playbox from '../playbox/Playbox';
import {push} from 'react-router-redux';
import {store} from '../store';
import qs from 'query-string';
import {boxPlayed} from '../actions';
import random from '../random';


export default (props) => {

  // Get last box
  const round = 1;
  const idx = props.boxes[round].length - 1
  const box = props.boxes[round][idx]

  console.log(idx, box)

  const playBox = <Playbox report={boxPlayed.bind(this, 1, idx)} result={box.result} outcome={box.outcome }/>

  return <div className="play">
    <p>
        Click boxes. Play until you win, or quit!
    </p>
    <div className="box">
    {playBox}
  </div>
    <button className="accept" onClick={() => store.dispatch(push(`/question?q=${4}`))}> quit </button>
    </div>
}

import React from 'react';
import Playbox from '../playbox/Playbox';
import {push} from 'react-router-redux';
import {store} from '../store';
import qs from 'query-string';
import {boxPlayed} from '../actions';
import random from '../random';


export default (props) => {
  const round = props.boxes.length - 1;
  const boxes = props.boxes[round];

  const allBoxesClicked = boxes.filter(b => !!b.result).reduce((a,b) => a+1, 0) === boxes.length

  const playBoxes = boxes.map((b,i) => <Playbox key={i} report={boxPlayed.bind(this, round, i)} result={b.result} outcome={b.outcome}/>)

  return <div className="play">
    <p>
    Click all the boxes, see how much you win!
    </p>
    <div className="boxes">
    {playBoxes}
  </div>
    <button disabled={!allBoxesClicked} className="accept" onClick={() => store.dispatch(push(`/question?q=${round === 1 ? 1 : 3 }`))}> continue </button>
    </div>
}

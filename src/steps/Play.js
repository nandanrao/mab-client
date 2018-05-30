import React from 'react';
import BoxPair from '../playbox/BoxPair';
import {push} from 'react-router-redux';
import {store} from '../store';
import qs from 'query-string';
import {boxPlayed} from '../actions';
import random from '../random';
import Rounds from './Rounds';
import {getResults, getWinnings} from '../utils';

export default (props) => {
  const {round, transitioning, button} = props
  const boxes = props.boxes[props.boxes.length - 1]

  const allBoxesClicked = boxes.filter(b => !!b.result).reduce((a,b) => a+1, 0) === boxes.length

  let curr = getResults(boxes).filter(r => !!r).length
  if (transitioning) {
    curr = curr - 1
  }

  const winnings = transitioning ? 0 : getWinnings(boxes)

  // const playBoxes = boxes.map((b,i) => <Playbox key={i} report={boxPlayed.bind(this, round, i)} result={b.result} outcome={b.outcome}/>)

  const playboxes = boxes.map((pairs,i) => {
    return <BoxPair boxes={pairs} idx={i} round={round} key={i}/>
  })

  return <div className="play">
    <Rounds boxes={boxes} />
    {winnings > 0 ? null : <div className="boxes"> {playboxes[curr]} </div>}
    <h3 className={winnings === 0 ? null : 'won'}> Won: ${winnings} </h3>
    { !button ? null : <button disabled={!allBoxesClicked && winnings === 0} className="accept" onClick={() => store.dispatch(push(`/question?q=${ 1 }`))}> continue </button>}

    </div>
}

import React from 'react';
import Playbox from '../playbox/Playbox';
import {push} from 'react-router-redux';
import {store} from '../store';
import qs from 'query-string';
import {boxPlayed} from '../actions';

export default (props) => {

  const boxes = props.boxes[0]
  const plays = props.boxes[1].length;
  boxes[0].value = 'high'
  boxes[1].value = 'low'
  const playboxes = boxes.map((b,i) => <Playbox key={i} report={boxPlayed.bind(this, 0, i)} result={b.result} value={b.value} outcome={b.outcome}/>)

  const second = (
    <div>
      <p> You lost! Now try this box: </p>
      {playboxes[1]}
    </div>
    )

  const third = (
    <div>
      <p> A green gem. You won! </p>

      <button className="accept" onClick={() => store.dispatch(push('/play'))}> continue </button>
    </div>
  )

  return <div className="intro">
    <p> There are two different types of boxes. "High" boxes have an up arrow, and "low" box have a "down" arrow:
    </p>

    {playboxes}

  <p>
    If you win a High box, you will receive a $5 bonus to your MTurk account. If you win a Low box, you will receive a $1 bonus to your account. You can only win one box, however: as soon as you win a box, the game is over.
    </p>

</div>

}

import React from 'react';
import Playbox from '../playbox/Playbox';
import {push} from 'react-router-redux';
import {store} from '../store';
import qs from 'query-string';
import {boxPlayed} from '../actions';

export default (props) => {

  const boxes = props.boxes[0]
  const plays = props.boxes[1].length;
  const playboxes = boxes.map((b,i) => <Playbox key={i} report={boxPlayed.bind(this, 0, i)} result={b.result} outcome={b.outcome}/>)

  const second = (
    <div>
      <p> The box had a red skull inside! Now try this box: </p>
      {playboxes[1]}
    </div>
    )

  const third = (
    <div>
      <p> A green gem!</p>

      <p> You will recieve a $5 bonus payment to your MTurk account if you find any green gems while playing the game. </p>
      <button className="accept" onClick={() => store.dispatch(push('/therub'))}> continue </button>
    </div>
  )

  return <div className="intro">
    <p>
    Thanks for coming. Here's the deal: all you have to do is click boxes. Here's an example of a box. Click it. What happens?
    </p>
    {playboxes[0]}
  { boxes[0].result ? second : null}
  { boxes[1].result ? third : null}
</div>

}

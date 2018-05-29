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

      <button className="accept" onClick={() => store.dispatch(push('/boxtypes'))}> continue </button>
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

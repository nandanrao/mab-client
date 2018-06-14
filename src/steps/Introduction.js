import React from 'react';
import Playbox from '../playbox/Playbox';
import {push} from 'react-router-redux';
import {store} from '../store';
import qs from 'query-string';
import {boxPlayed} from '../actions';

export default (props) => {

  const boxes = props.boxes[0]
  const plays = props.boxes[1].length;

  const playboxes = boxes.map((b,i) => <Playbox key={i} report={boxPlayed.bind(this, 0, i)} result={b.result} outcome={b.outcome} speed={props.boxSpeed } />)

  const second = (
    <div>
      <p> You lost! Now try this box: </p>
      {playboxes[1]}
    </div>
    )

  const third = (
    <div>
      <p> A green gem. You won! </p>

      <p> This was just a practise, but in the real game, you win $5 if you get a green gem. </p>
      <button className="accept" onClick={() => store.dispatch(push('/play'))}> continue </button>
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

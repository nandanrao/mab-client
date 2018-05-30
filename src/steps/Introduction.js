import React from 'react';
import BoxPair from '../playbox/BoxPair';
import {push} from 'react-router-redux';
import {store} from '../store';
import qs from 'query-string';
import {boxPlayed} from '../actions';
import {hasResult} from '../utils'
export default (props) => {

  const boxes = props.boxes[0]

  const playboxes = boxes.map((pairs,i) => {
      return <BoxPair boxes={pairs} idx={i} round={0} key={i}/>
  })

  const second = (
    <div>
      <p> You lost! Now try again. Please note, you can only click one box: </p>
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
    Thanks for coming. Here's the deal: all you have to do is click boxes. Boxes come in pairs, one is "high", the other is "low". Try clicking one:
    </p>
    { playboxes[0] }
  { hasResult(boxes[0]) ? second : null}
  { hasResult(boxes[1]) ? third : null}
</div>

}

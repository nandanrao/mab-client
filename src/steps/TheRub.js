import React from 'react';

import {push} from 'react-router-redux';
import {store} from '../store';

export default (props) => {
  const boxes = props.boxes[props.boxes.length - 1]
  const prob = Math.round(2/boxes.length * 100)
  return <div className="intro">
    <p>
    Now, here's the rub:
    </p>
    <p>
For 50% of participants in this experiment, High boxes and Low boxes are random and they will be won with the same probability (about {prob}% per box).
</p>
<p>
For the other 50% of participants, Low boxes are random (probability of {prob}%), but High boxes are impossible to win (probability of 0%).
    </p>
<p>
Right now, you don't know which group you are in. Maybe it will be easy for you to win $5, but maybe it will be impossible.
</p>
<p>
Questions? Use the back button in your browser to review the instructions. Then, when you're ready to play, click below:
</p>
    <button className="accept" onClick={ () => {
            store.dispatch({ type: 'ADD_GAME', size: boxes.length, treatment: props.treatment })
            store.dispatch(push('/play'))
    }}> begin </button>
    </div>
}

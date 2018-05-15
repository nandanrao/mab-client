import React from 'react';
import Playbox from '../playbox/Playbox';
import {push} from 'react-router-redux';
import {store} from '../store';
import qs from 'query-string';

export default (props) => {

  const plays = props.boxes[0].length;

  return <div className="intro">
    <p>
    Welcome to our experiment. Please read the instructions carefully.
    </p>
    <p>
    You will given {plays} chances to win.
    </p>
  <p>Below is an example of the box you must click to play. The final image will be a red skull if you lose. Click this box to play:
  </p>
    <Playbox outcome="lose" />
    <p> You lost! Now try this box, you win a box if the final image is a green gem: </p>
    <Playbox outcome="win" />
    <p> You will recieve $1 bonus for every box you win. Click below to play the game: </p>
    <button className="accept" onClick={() => store.dispatch(push('/play?round=1'))}> continue </button>
    </div>
}

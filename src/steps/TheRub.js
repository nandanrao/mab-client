import React from 'react';

import {push} from 'react-router-redux';
import {store} from '../store';

export default (props) => {

  const boxes = props.boxes[props.boxes.length - 1]

  const prob = Math.round(2/boxes.length * 100)

  return <div className="therub">
    <p>
    The game starts on the next screen. Read carefully:
  </p>
    <p>
    You will be shown a never-ending series of boxes. You can play for as long as you wish.
    </p>
    <p>
The game ends when you click the "quit" button, or when you find a green gem, whichever comes first.
    </p>
    <p>
For 50% of participants in this experiment, every single box contains a red skull. It is impossible to win $5.
</p>
<p> For the other 50% of participants, some boxes contain a green gem. </p>
<p>
Right now, you don't know which group you are in. Maybe you can win $5, maybe you can't.
</p>
<p>
 Ready? Click below to play:
</p>
    <button className="accept" onClick={ () => {
            store.dispatch({ type: 'ADD_FIRST_BOX' })
            store.dispatch(push('/play'))
    }}> begin </button>
    </div>
}

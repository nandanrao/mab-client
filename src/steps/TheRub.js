import React from 'react';

import {push} from 'react-router-redux';
import {store} from '../store';

export default (props) => {

  const boxes = props.boxes[props.boxes.length - 1]
  const plays = boxes.length



  return <div className="therub">
    <p>
    You will be shown {plays} boxes on the next screen.
    </p>
    <p>
    Each box has the same chances of having a green gem.
    </p>
    <p>
    If you find any green gems, you recieve a $5 bonus to your MTurk account!
  </p>
    <p>
    The maximum bonus you can recieve is $5, regardless of how many gems you find.
    </p>
    <p>
    Ready? Click below to play:
    </p>
    <button className="accept" onClick={ () => {
            store.dispatch(push('/play'))
    }}> begin </button>
    </div>
}

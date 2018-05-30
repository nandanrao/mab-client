import React from 'react';
import BoxPair from '../playbox/BoxPair';
import {push} from 'react-router-redux';
import Play from './Play';
import {store} from '../store';
import qs from 'query-string';
import {boxPlayed} from '../actions';
import {getResults, getWinnings} from '../utils';

export default (props) => {
  const {transitioning, treatment} = props
  const boxes = props.boxes[1]
  const winnings = transitioning ? 0 : getWinnings(boxes);

  const second = (
    <div>
      <p>
      You won ${winnings}! Good job.
      </p>
      <p>
      As soon as you win a box, however, the game is over.
      </p>
      <button className="accept" onClick={() => store.dispatch(push('/therub'))}> continue </button>
      </div>
    )

  return <div className="intro">
    <p> "High" boxes have an up arrow, and "low" box have a "down" arrow.
    </p>
    <p>If you win a High box, you will receive a $5 bonus to your MTurk account. If you win a Low box, you will receive a $1 bonus to your account.
    </p>
    <p>
    You will play {treatment === 'a' ? 12 : 45 } rounds. Try playing a few now:
  </p>

  <Play {...props} boxes={boxes} round={1} button={false}/>

  { winnings === 0 ? null : second }

  </div>

}

import React from 'react';
import BoxPair from '../playbox/BoxPair';
import {push} from 'react-router-redux';
import Play from './Play';
import {store} from '../store';
import qs from 'query-string';
import {boxPlayed} from '../actions';
import {getResults, getWinnings} from '../utils';

export default (props) => {
  const {transitioning} = props

  // this is the second round of boxes
  const boxes = props.boxes[1]

  const winnings = transitioning ? 0 : getWinnings(boxes);

  const highs = (
    <p>
      Now you're glad you picked the High box, huh? If you had won a Low box, you would have ended the game with only $1!
      </p>
  )

  const lows = (
    <p>
At least you won something. But what if you had picked High boxes? Maybe you would have won $5!
      </p>
  )

  const second = (
    <div>
      <p>
      Game over!
      </p>
<p>
Good job, you won ${winnings} (in this practise round).
</p>
     { winnings === 5 ? highs : lows }
      <button className="accept" onClick={() => store.dispatch(push('/therub'))}> continue </button>
      </div>
    )

  return <div className="intro">
    <p> "High" boxes have an up arrow, and "low" box have a "down" arrow.
    </p>
    <p>If you win a High box, you will receive a $5 bonus to your MTurk account. If you win a Low box, you will receive a $1 bonus to your account.
    </p>
    <p>
    You will play { boxes.length } rounds. As soon as you win a box, the game is over. Try playing a few rounds now:
  </p>

  <Play {...props} round={1} button={false}/>

  { winnings === 0 ? null : second }

  </div>

}

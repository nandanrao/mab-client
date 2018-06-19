import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {store} from '../store';
import qs from 'query-string';
import {submit} from '../actions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import GuessProbability from './GuessProbability';

export default class Question extends Component {




  render() {
    const props = this.props
    const q = +qs.parse(props.location.search).q
    const plays = props.boxes[1].length;

    const submitGuess = (key) => (vals) => {
      store.dispatch({ type: 'NEW_RESPONSE', responses: { [key]: vals }})
      store.dispatch(push(`/question?q=${ q+1 }`))
    }

    const roundsPlayed = props.boxes.filter(round => {
      return round.map(b => b.result).filter(res => !!res).length > 0
    })

    const winnings = roundsPlayed.map(r => r.filter(b => b.result === 'win').reduce((a,b) => a+1, 0)).map(w => Math.min(w*5, 5))

    const finalWinnings = winnings.slice().pop()

    const code = () => {
      if (props.code === '_FETCHING') {
        return <FontAwesomeIcon spin size="2x" icon={faSpinner} />
      }
      if (props.code) {
        return <h3> {props.code} </h3>
      }
      return <button onClick={ () => store.dispatch(submit())}> generate code </button>
    }

    const q1 = (<GuessProbability next="second" winnings={winnings[1]} plays={plays} submit={submitGuess('q1')} />)

    const q2 = (
      <div className="question">
        <p>
          Do you wish to play another round?
        </p>
        <p>
        If you choose to quit now, you will recieve a $2 participation bonus.
        </p>
        <p>
        If you choose to play another round, you will forfeit the $2 participation bonus, but will have the chance to win $5 if you find a green gem.
        </p>

        <button onClick={ () => {
            store.dispatch({ type: 'ADD_GAME', size: props.boxes[1].length})
            store.dispatch(push('/play'))
          }}> play again </button>
        <button onClick={ () => store.dispatch(push('/question?q=4'))}> stop now </button>
      </div>
    )

    const q3 = (<GuessProbability next="third" winnings={winnings[2]} plays={plays} submit={submitGuess('q3')} />)

    const q4 = (
      <div className="question">
        <p>
          Thanks for participating! You won a bonus of ${ roundsPlayed.length > 2 ? finalWinnings : 0.75 }, which you will receive within 48 hours.

        </p>
        <p>
          That's the end of the experiment. Please write down your completion code:
        </p>
        { code() }
      </div>
  )
  return [null, q1, q2, q3, q4][q]
}
}

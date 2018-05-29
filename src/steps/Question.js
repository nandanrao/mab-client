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

    const winnings = roundsPlayed.map(r => r.filter(b => b.result === 'win').reduce((a,b) => a+1, 0))

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

    const q1 = (<GuessProbability next="second" winnings={winnings} plays={plays} submit={submitGuess('q1')} />)

    const q2 = (
      <div className="question">
        <p>
          Do you wish to play another round? If you choose to quit now, you will recieve a $0.75 bonus for your participation. If you choose to play another round, you will forfeit that $0.75 bonus, but will recieve a bonus equal to the number of boxes you win in the next round.
        </p>

        <button onClick={ () => {
            store.dispatch({ type: 'ADD_GAME', size: props.boxes[1].length})
            store.dispatch(push('/play'))
          }}> play again </button>
        <button onClick={ () => store.dispatch(push('/question?q=4'))}> stop now </button>
      </div>
    )

    const q3 = (<GuessProbability next="third" winnings={winnings} plays={plays} submit={submitGuess('q3')} />)

    const q4 = (
      <div className="question">
        <p>
          Thanks for participating! You won ${ finalWinnings }.
        </p>
        <p>
          That's the end of the experiment. You will receive a ${finalWinnings} bonus within the next 48 hours. Please write down your completion code:
        </p>
        { code() }
      </div>
  )
  return [null, q1, q2, q3, q4][q]
}
}

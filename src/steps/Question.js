import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {store} from '../store';
import qs from 'query-string';
import {submit} from '../actions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import GuessProbability from './GuessProbability';
import {getWinnings} from '../utils';

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

    const winnings = props.boxes.map(getWinnings)
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

    const q1 = (
      <div className="question">
        <p>
          Thanks for participating! You won a bonus of ${ finalWinnings }, which you will receive within 48 hours.

        </p>
        <p>
          That's the end of the experiment. Please write down your completion code:
        </p>
        { code() }
      </div>
  )
  return [null, q1][q]
}
}

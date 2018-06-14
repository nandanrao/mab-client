import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {store} from '../store';
import {getWinnings} from '../utils';
import qs from 'query-string';
import {submit} from '../actions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import GuessProbability from './GuessProbability';

export default class Question extends Component {

  render() {
    const props = this.props
    const q = +qs.parse(props.location.search).q

    const roundsPlayed = props.boxes[1].length

    const finalWinnings = getWinnings(props.boxes[1])

    const code = () => {
      if (props.code === '_FETCHING') {
        return <FontAwesomeIcon spin size="2x" icon={faSpinner} />
      }
      if (props.code) {
        return <h3> {props.code} </h3>
      }
      return <button onClick={ () => store.dispatch(submit())}> generate code </button>
    }
    const q4 = (
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
  return [null, null, null, null, q4][q]
}
}

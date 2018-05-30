import {store} from './store';
import fetch from 'isomorphic-fetch';
import { SERVER_URL } from './constants'
import querystring from 'querystring';
import random from './random';

export function boxPlayed(round, idx, jdx, result) {
  store.dispatch({type: 'BOX_PLAYED', round: round, idx: idx, jdx:jdx, result: result })
  store.dispatch({ type: 'TRANSITIONING', state: true })
  const timeout = result === 'win' ? 500 : 1000
  setTimeout(() => store.dispatch({ type: 'TRANSITIONING', state: false }), timeout)
}


export function submit() {
  return (dispatch, getState) => {
    dispatch({ type: 'FETCHING_CODE' })
    const state = getState()
    fetch(`${SERVER_URL}/submit`,
          {
            method: 'POST',
            body: JSON.stringify({ ...state }),
            headers: { 'content-type': 'application/json' }
          })
    .then(res => res.json())
    .then(res => {
      dispatch({ type: 'CODE_GENERATED', code: res.code })
    })
    .catch(err => {
      dispatch({ type: 'CODE_GENERATED', code: null })
      console.error(err)
      alert('Sorry, we have had an error recording your results. Please try again, or send me an email at nandanrao at upf.edu. Error: ' + err)
    })
  }
}

export function assignTreatment() {
  return (dispatch, getState) => {
    const {version} = getState()
    const qs = querystring.stringify({version: version})
    fetch(`${SERVER_URL}/treatment?${qs}`)
      .then(res => res.json())
      .then(res => store.dispatch({
        type: 'ASSIGN_TREATMENT', treatment: { ab: res.treatment, skill: random.bool(.5) }
      }))
      .catch(err => {
        console.error(err)
        setTimeout(() => window.location.reload(), 3000)
      })
  }
}

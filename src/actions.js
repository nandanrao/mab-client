import {store} from './store';
import fetch from 'isomorphic-fetch';
import { SERVER_URL } from './constants'
import querystring from 'querystring';
export function boxPlayed(round, idx, result) {
  store.dispatch({type: 'BOX_PLAYED', round: round, idx: idx, result: result })
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
      .then(res => store.dispatch({ type: 'ASSIGN_TREATMENT', treatment: res.treatment}))
      .catch(err => {
        console.error(err)
        window.location.reload()
      })
  }
}

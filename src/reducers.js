import {store} from './store';
import {initBoxes, fairBox} from './utils';

function responses(state = {}, action) {
  switch (action.type){
  case 'NEW_RESPONSE':
    return {...state, ...action.responses}
  default:
    return state
  }
}

function winnings(state = 0, action) {
  switch (action.type){
  default:
    return state
  }
}

function boxes(state = [], action) {
  switch (action.type){
  case 'ADD_BOX':
    state[action.round] = [...state[action.round], fairBox(action.treatment)]
    return state
  case 'ASSIGN_TREATMENT':
    return initBoxes(action.treatment)
  case 'BOX_PLAYED':
    const {round, idx, result} = action
    state[round][idx].result = result
    return [...state]
  default:
    return state
  }
}

function treatment(state = null, action) {
  switch (action.type){
  case 'ASSIGN_TREATMENT':
    return action.treatment
  default:
    return state
  }
}

function code(state = null, action) {
  switch (action.type) {
  case 'CODE_GENERATED':
    return action.code
  case 'FETCHING_CODE':
    return '_FETCHING'
  default:
    return state
  }
}

function transitioning(state = false, action) {
  switch (action.type) {
  case 'TRANSITIONING':
    return action.state
  default:
    return state
  }
}

function version(state='0.5') {
  return state
}

export default {responses, boxes, treatment, code, version, transitioning}

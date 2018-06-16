import {store} from './store';
import {initBoxes, generateFairGame} from './utils';

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
  case 'ADD_GAME':
    return [...state, generateFairGame(action.size)]
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

function version(state='0.31') {
  return state
}

export default {responses, boxes, treatment, code, version}

import {store} from './store';
import {initBoxes} from './utils';

function responses(state = {}, action) {
  switch (action.type){
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

export default {responses, boxes, treatment}

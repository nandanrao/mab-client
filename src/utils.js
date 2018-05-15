export function initBoxes(treatment) {
  if (treatment === 'a') {
    const first = [...Array(3)].map(i => ({result: null, outcome: 'lose'}))
    first[1].outcome = 'win'
    const second = [...Array(3)].map(i => ({result: null, outcome: 1/3}))
    return [first, second]
  }
  else if (treatment === 'b'){
    const first = [...Array(15)].map(i =>  ({result: null, outcome: 'lose'}))
    first[12].outcome = 'win'
    const second = [...Array(15)].map(i =>  ({result: null, outcome: 1/15}))
    return [first, second]
  }
}

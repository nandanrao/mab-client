export function generateFairGame(rounds) {
  return [...Array(rounds)].map(i =>  ({result: null, outcome: 1/rounds}))
}

export function initBoxes(treatment) {
  let first, second;
  if (treatment === 'a') {
    first = [...Array(3)].map(i => ({result: null, outcome: 'lose'}))
    // first[1].outcome = 'win'
  }
  else if (treatment === 'b'){
    first = [...Array(15)].map(i =>  ({result: null, outcome: 'lose'}))
    // first[12].outcome = 'win'
  }
  return [[{result: null, outcome: 'lose'}, {result: null, outcome:'win'}], first]
}

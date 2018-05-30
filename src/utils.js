export function generateFairGame(rounds) {
  return [...Array(rounds)].map(i =>  ({result: null, outcome: 1/rounds}))
}

export function initBoxes(treatment) {
  let first, second;
        // const plays = treatment == 'a' ? 3 : 15;
  const o = {result: null, outcome: 'lose'}
  if (treatment === 'a') {
    first = [...Array(12)].map(i =>  [{...o, value: 'high'}, {...o, value: 'low'}])
    first[3] = first[3].map(b => ({...b, outcome:'win'}))
  }
  else if (treatment === 'b'){
    first = [...Array(45)].map(i =>  [{...o, value: 'high'}, {...o, value: 'low'}])
    first[6] = first[3].map(b => ({...b, outcome:'win'}))
  }
  const introBoxes = [
    [{result: null, outcome: 'lose', value: 'high' }, {result: null, outcome:'lose', value: 'low'}],
    [{result: null, outcome: 'win', value: 'high'}, {result: null, outcome:'win', value: 'low'}]
  ]

  return [introBoxes].concat([first])
}

export function disablePair(boxes, transitioning) {
  return boxes.map(([a,b]) => {
    if (transitioning) {

    }
    return a.result || b.result ? [a,b].map(o => ({...o, disabled: true})) : [a,b]
  })
}

export function hasResult(group) {
  const [a,b] = group;
  return a.result || b.result;
}

export function getResult(group) {
  const [a,b] = group;
  return a.result || b.result;
}

export function getResults(boxes) {
  return boxes.map(group => getResult(group))
}

export function getWinnings(boxes) {
  const idx = boxes.map(getResult).indexOf('win')
  if (idx === -1) return 0
  return boxes[idx][0].result == 'win' ? 5 : 1
}

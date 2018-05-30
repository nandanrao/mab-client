import random from './random';

export function generateFairGame(rounds, {skill}) {
  const gameType = skill ? 'high' : 'low';
  const o = {result: null, outcome: 2/rounds}
  const a = [...Array(rounds)]
  if (gameType === 'high') {
    return a.map(i =>  [{...o, value: 'high'}, {...o, value: 'low'}])
  }
  if (gameType === 'low') {
    return a.map(i =>  [{...o, outcome: 'lose', value: 'high'}, {...o, value: 'low'}])
  }
}

export function initBoxes({ab}) {

  const plays = ab == 'a' ? 12 : 36;
  const o = {result: null, outcome: 'lose'}

  const first = [...Array(plays)].map(i =>  [{...o, value: 'high'}, {...o, value: 'low'}])
  first[3] = first[3].map(b => ({...b, outcome:'win'}))

  const introBoxes = [
    [{...o, value: 'high' }, {...o, value: 'low'}],
    [{...o, outcome: 'win', value: 'high'}, {...o, outcome:'win', value: 'low'}]
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

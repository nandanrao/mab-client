export function getSpeed(treatment) {
  if (treatment) {
    return treatment.ab === 'a' ? 'fast' : 'slow';
  }
  return 'foo'
}

export function fairBox({skill, ab}) {
  const box = { result: null, timestamp: new Date() }
  if (skill === false) {
    return { ...box, outcome: 'lose' }
  }
  else if (ab === 'a') {
    return { ...box, outcome: 1/160 }
  }
  else if (ab === 'b') {
    return { ...box, outcome: 1/40 }
  }
}

export function initBoxes(treatment) {
  return [
    // Intro
    [{result: null, outcome: 'lose'}, {result: null, outcome:'win'}],
  ]
}

export function getWinnings(boxes) {
  const wins = boxes.filter(a => a.result === 'win')
  return wins.length > 0 ? 5 : 0
}

export function getSpeed(treatment) {
  if (treatment) {
    return treatment.ab === 'a' ? 'fast' : 'slow';
  }
  return 'fast'
}

export function fairBox({skill, ab}) {
  if (skill === false) {
    return { result: null, outcome: 'lose' }
  }
  else if (ab === 'a') {
    return { result: null, outcome: 1/160 }
  }
  else if (ab === 'b') {
    return { result: null, outcome: 1/40 }
  }
}

export function initBoxes(treatment) {
  return [
    // Intro
    [{result: null, outcome: 'lose'}, {result: null, outcome:'win'}],

    // Play
    [{result: null, outcome: 'lose'}]
  ]
}

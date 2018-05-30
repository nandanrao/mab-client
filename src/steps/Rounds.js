import React from 'react';
import { getResults } from '../utils';
import './Rounds.css'

export default (props) => {
  const {boxes} = props;
  const results = getResults(boxes);

  const dots = results.map((r,i) => {
    let color;
    if (r === null) {
      color = 'grey'
    }
    else {
      color = r === 'win' ? 'green' : 'red';
    }
    const styles = {borderColor: color, backgroundColor: color}
    return <li key={i} style={styles}> </li>
  })

  return <ul className="rounds">
    {dots}
    </ul>
}

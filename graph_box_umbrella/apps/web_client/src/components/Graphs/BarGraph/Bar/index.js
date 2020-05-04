import React from 'react';
import './index.scss';

const Bar = ({ bar, heightDifference }) => {
  return (
    <div className="bar-container">
      <div className="bar" style={{ height: `${bar.value * heightDifference}%` }} ></div>
      <label className="bar-label">{bar.year}</label>
    </div>
  )
}
export default Bar;
import React, { Component } from "react";
import getBarGraph from '../../../httpClient/index';
import Bar from './Bar/index'
import './index.scss';

class BarGraph extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    const barGraphValues = await getBarGraph()
    this.setState(barGraphValues)
  }

  loopBars() {
    const { bars, max } = this.state;
    if (bars && max) {
      const heightDifference = 100 / max
      return bars.map((bar, index) => <Bar bar={bar} heightDifference={heightDifference} key={index} ></Bar>)
    }
  }

  renderVerticalDelimiter() {
    let { vertical_delimiter, max } = this.state;
    if (vertical_delimiter && max) {
      let arrayForVerticalBar = []

      for (var i = 0; i <= max; i += 10) {
        arrayForVerticalBar.push(i)
      }

      return arrayForVerticalBar.map((value, index) => <span key={index}>{value} -</span>)
    }
  }

  render() {
    const { name, vertical_name, horizontal_name } = this.state
    return (
      <div className="bar-graph">
        <h1 className="graph-name">{name}</h1>
        <label className="graph-label vertical">{vertical_name}</label>
        <div className="graph-grid">
          {this.loopBars()}
          <div className="graph-verticle-delimiters">
            {this.renderVerticalDelimiter()}
          </div>
        </div>
        <label className="graph-label horizontal">{horizontal_name}</label>
      </div>
    );
  }
};

export default BarGraph;
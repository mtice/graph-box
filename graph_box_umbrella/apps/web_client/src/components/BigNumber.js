
import React, { Component } from "react";
import getValueTest from '../httpClient/index';
import './BigNumber.css';

class BigNumber extends Component {
  constructor() {
    super();
    this.state = { value: "" };
  }

  async componentDidMount() {
    const { value } = await getValueTest()
    this.setState({ value })
  }

  render() {
    return (
      <h1 className="big-number">{this.state.value}</h1>
    );
  }
};

export default BigNumber;
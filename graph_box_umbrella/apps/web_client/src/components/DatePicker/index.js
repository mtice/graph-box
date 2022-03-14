import 'date-fns';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

export default class StackedColumns extends Component {
  constructor(props) {
    super(props);

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  formatCategory(category) {
    const [withoutGMT] = category.split(" ")
    return withoutGMT
  }

  handleDateChange(e) {
    this.props.callback(e.target.value, this.props.index)
  };

  render() {
    return <TextField
      id="date"
      label="Date"
      type="date"
      defaultValue={this.formatCategory(this.props.category)}
      onBlur={this.handleDateChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
  }
}

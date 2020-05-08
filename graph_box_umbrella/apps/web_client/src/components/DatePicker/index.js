import 'date-fns';
import React, { Component } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';

export default class StackedColumns extends Component {
  constructor(props) {
    super(props);

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  formatCategory(category) {
    const [withoutGMT] = category.split(" ")
    return withoutGMT
  }

  handleDateChange(date) {
    this.props.callback(date, this.props.index)
  };

  render() {
    return <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="MM/dd/yyyy"
      margin="normal"
      id="date-picker-inline"
      label="Date picker inline"
      value={this.formatCategory(this.props.category)}
      onChange={this.handleDateChange}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />
  }
}

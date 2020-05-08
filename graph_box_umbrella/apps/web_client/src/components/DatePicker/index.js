import 'date-fns';
import React, { Component } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';

export default class StackedColumns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: new Date()
    }

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange(date) {
    this.setState({
      selectedDate: date
    }, () => {
      console.log('kkkkkk', this.props.category);
      this.props.callback(date, this.props.index)
    })
  };

  render() {
    console.log('jjj', this.state);
    return <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="MM/dd/yyyy"
      margin="normal"
      id="date-picker-inline"
      label="Date picker inline"
      value={this.props.category}
      onChange={this.handleDateChange}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />
  }
}

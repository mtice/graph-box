import React, { Component } from "react";
import Chart from 'react-apexcharts';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import './index.scss';

const styles = theme => ({
  textField: {
    marginLeft: 8,
    marginRight: 8
  },
  button: {
    margin: 8
  },
  editTextField: {
    marginTop: 12,
    marginBottom: 12
  }
})

class BasicColumnChart extends Component {
  state = {
    series: [{
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
      name: 'Free Cash Flow',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands"
          }
        }
      }
    },
  };

  setXAxisName(series, event) {
    let newSeriesArray = [...this.state.series]
    newSeriesArray[series] = { ...newSeriesArray[series], name: event.target.value }

    this.setState({
      series: newSeriesArray
    })
  }

  setYAxisName(e) {
    this.setState({
      options: {
        yaxis: {
          title: {
            text: e.target.value
          }
        }
      }
    })
  }

  setCategories(e) {
    this.setState({
      options: {
        yaxis: {
          title: {
            text: e.target.value
          }
        }
      }
    })
  }

  addXAxisColumn(e) {
    console.log('soooo');
  }

  editSeries(e, name) {
    const newSeriesArray = [...this.state.series]
    const index = newSeriesArray.findIndex((i) => i.name === name)

    newSeriesArray[index] = { ...newSeriesArray[index], name: e.target.value }

    this.setState({
      series: newSeriesArray
    })
  }

  addNewSeries(e) {
    let newSeriesArray = [...this.state.series, { name: "", data: [] }]

    this.setState({
      series: newSeriesArray
    })
  }

  loopExistingData(classes) {
    return this.state.series.map((series) => {
      const name = series.name;

      return (
        <div key={name}>
          <TextField className={classes.editTextField} label={name} variant="outlined" onBlur={e => this.editSeries(e, name)} />
        </div>
      )
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div id="chart">
        <Chart options={this.state.options} series={this.state.series} type="bar" height={350} />

        {this.loopExistingData(classes)}

        <label className="field-label">Add More Data:</label>
        <Fab size="small" color="primary" aria-label="add" className={classes.button} onClick={() => { this.addNewSeries() }} >
          <AddIcon />
        </Fab>
        <hr />


        <div className="chart-control">
          <div className="chart-control-group">
            <label className="field-label">Y-Axis Title:</label>
            <TextField className={classes.textField} label="Y-Axis Title" variant="outlined" onChange={e => this.setCategories(e)} />
          </div>
          <div className="chart-control-group">
            <label className="field-label">X-Axis labels:</label>
            <TextField className={classes.textField} label="Y-Axis Title" variant="outlined" onChange={e => this.setCategories(e)} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BasicColumnChart);
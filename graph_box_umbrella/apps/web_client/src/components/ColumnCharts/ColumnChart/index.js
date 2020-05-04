import React, { Component } from "react";
import Chart from 'react-apexcharts';
import TextField from '@material-ui/core/TextField';


class BasicColumnChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

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

  render() {
    return (
      <div id="chart">
        <Chart options={this.state.options} series={this.state.series} type="bar" height={350} />
        <TextField id="outlined-basic" label="Y Axis Label" variant="outlined" onChange={(e) => this.setYAxisName(e)} />
        <TextField id="outlined-basic" label="X Axis Labels" variant="outlined" onChange={(e) => this.setXAxisName(0, e)} />
        <TextField id="outlined-basic" label="X Axis Labels" variant="outlined" onChange={(e) => this.setXAxisName(1, e)} />
        <TextField id="outlined-basic" label="X Axis Labels" variant="outlined" onChange={(e) => this.setXAxisName(2, e)} />
      </div>
    );
  }
}

export default BasicColumnChart;
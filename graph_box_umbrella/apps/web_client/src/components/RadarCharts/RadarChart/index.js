import React, { Component } from "react";
import Chart from 'react-apexcharts';
import { TextField, Grid, Button, ButtonGroup, Icon } from '@material-ui/core';
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  chart: {
    paddingLeft: 343,
    height: "100%",
    width: "calc(100% - 335px)"
  },
  textField: {
    margin: 8
  },
  buttonGroup: {
    margin: 8
  },
  grid: {
    flexBasis: '50%'
  }
})

class RadarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: 'Series 1',
        data: [0, 0, 0, 0, 0, 0],
      }],
      options: {
        chart: {
          height: 350,
          type: 'radar',
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
          }
        },
        title: {
          text: 'Radar Chart - Multi Series'
        },
        stroke: {
          width: 2
        },
        fill: {
          opacity: 0.1
        },
        markers: {
          size: 0
        },
        xaxis: {
          categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6']
        },
      },
    };
  }

  pushField() {
    const newIndex = this.state.series.length + 1;
    let newData = [0]
    let newSeriesArray = [...this.state.series, { name: `Series ${newIndex}`, data: [...newData] }];
    this.setState({
      series: newSeriesArray
    });
  }

  popField() {
    let newSeriesArray = [...this.state.series];
    newSeriesArray.pop();
    this.setState({
      series: newSeriesArray
    });
  }

  pushCategory() {
    let i = this.state.options.xaxis.categories.length + 1;
    let newCategories = [...this.state.options.xaxis.categories];
    newCategories.push(`Category ${i}`);
    this.setState({
      options: {
        ...this.state.options,
        xaxis: {
          categories: [...newCategories]
        }
      }
    });
  }

  popCategory() {
    let newCategories = [...this.state.options.xaxis.categories];
    newCategories.pop();
    this.setState({
      options: {
        ...this.state.options,
        xaxis: {
          categories: [...newCategories]
        }
      }
    });
  }

  updateFieldName(e, index) {
    let newSeriesArray = [...this.state.series];
    newSeriesArray[index] = {...newSeriesArray[index], name:e.target.value};
    this.setState({
      series: newSeriesArray
    });
  }

  updateCategoryName(e, index) {
    let newCategories = [...this.state.options.xaxis.categories];
    newCategories[index] = e.target.value;
    this.setState({
      options: {
        xaxis: {
          categories: [...newCategories]
        }
      }
    });
  }

  getMaxSize(seriesArray) {
    let max = 0;
    for(let i = 0; i < seriesArray.length; i++) {
      max = max < seriesArray[i].data.length ? seriesArray[i].data.length : max;
    }
    return max;
  }

  updateFieldData(data, index) {
    const newData = data.trim().split(' ');
    let newCategories = [];
    let previousCategories = [...this.state.options.xaxis.categories];
    const maxLength = this.getMaxSize([...this.state.series]);
    for (let i = 0; i < maxLength; i++) {
      if (previousCategories[i]) {
        newCategories.push(previousCategories[i]);
      }
      else {
        newCategories.push(`Category ${i+1}`);
      }
    }
    let newSeriesArray = [...this.state.series];
    newSeriesArray[index] = {...newSeriesArray[index], data: newData};
    this.setState({
      series: newSeriesArray,
      options: {
        ...this.state.options,
        xaxis: {
          categories: [...newCategories]
        }
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div id="chart" className={classes.chart} >
        <Chart options={this.state.options} series={this.state.series} type="radar" height={480} />
        <div style={{maxWidth: "95%"}}>
          <ButtonGroup className={classes.buttonGroup} disableElevation variant="contained" color="primary">
            <Button size="small" color="primary" aria-label="add" onClick={() => { this.pushField() }}>
              <AddIcon />
            </Button>
            <Button disabled={this.state.series.length < 2} size="small" color="secondary" aria-label="add" onClick={() => { this.popField() }}>
              <RemoveIcon className={classes.rightIcon} />
            </Button>
          </ButtonGroup>

          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.grid} >
              {this.state.series.map((data, index) => {
                return (
                  <div class="text-list">
                    <TextField className={classes.textField} label="Field Name" defaultValue={ data.name } variant="outlined" onChange={e => this.updateFieldName(e, index)}/>
                    <TextField 
                      label="Field Data"
                      defaultValue={ this.state.series[index].data.join(' ') }
                      variant="outlined"
                      className = {classes.textField}
                      onChange = { e => {
                        const remove_zero = /(^| )(0+)([1-9][0-9]*)/gi;
                        e.target.value = e.target.value.replace(/^ /gi, '').replace(/[^0-9\s\\]/gi, '').replace('.', '').replace('  ', ' ').replace(remove_zero, "$1$3");
                        this.updateFieldData(e.target.value, index)
                      }}
                    />
                  </div>
                )
              })}
            </Grid>
            <Grid item xs={4} className={classes.grid}>
              {this.state.options.xaxis.categories.map((item, index) => {
                let i = index+1;
                return (
                  <div class="text-list">
                    <TextField className={classes.textField} label={"Category "+i} defaultValue={ item } variant="outlined" onChange={e => this.updateCategoryName(e, index)} />
                  </div>
                )
              })}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(RadarChart);
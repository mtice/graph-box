import React, { Component } from "react";
import Chart from 'react-apexcharts';
import { LoopSeries, LoopCategories } from './loops';

//@material-ui styling
import { withStyles } from '@material-ui/core/styles';
import { styles } from './classes';


//@material-ui components
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class ColumnWithLabels extends React.Component {
  constructor() {
    super();

    this.state = {
      series: [{
        name: 'Inflation',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
      }],
      options: {
        chart: {
          height: 450,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -10,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },

        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "%";
            }
          }

        },
        title: {
          text: 'Monthly Inflation in Argentina, 2002',
          floating: true,
          margin: 50,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      },
    };

    this.editCategories = this.editCategories.bind(this);
    this.editSeriesTitle = this.editSeriesTitle.bind(this);
    this.editSeriesValues = this.editSeriesValues.bind(this);
  }

  editCategories(e, categoryIndex) {
    const { value } = e.target;
    if (value !== "") {
      const categoriesCopy = [...this.state.options.xaxis.categories]

      categoriesCopy[categoryIndex] = value

      this.setState({
        options: {
          ...this.state.options,
          xaxis: {
            categories: categoriesCopy
          }
        }
      });
    }
  }

  editTitle(e) {
    const { value } = e.target;

    this.setState({
      options: {
        ...this.state.options,
        title: {
          ...this.state.options.title,
          text: value
        }
      }
    })
  }

  editSeriesTitle(e, seriesName) {
    const { value } = e.target
    if (value !== "") {
      const seriesCopy = [...this.state.series]
      const index = seriesCopy.findIndex((obj) => obj.name === seriesName)

      seriesCopy[index] = { ...seriesCopy[index], name: value }

      this.setState({
        series: seriesCopy
      })
    }
  }

  editSeriesValues(e, index, seriesName) {
    const { value } = e.target

    if (value !== "" && parseInt(value)) {
      this.setState(prevState => ({
        series: prevState.series.map((series) => {
          if (series.name !== seriesName) {
            return series
          }

          return {
            ...series,
            data: series.data.map((dataValue, dataIndex) => {
              if (dataIndex !== index) {
                return dataValue
              }

              return value
            })
          }
        })
      }))
    }
  }

  addNewCategory() {
    const { categories } = this.state.options.xaxis
    this.setState({
      series: this.state.series.map(({ data, name }) => {
        return {
          data: data.concat([0]),
          name
        }
      }),
      options: {
        ...this.state.options,
        xaxis: {
          categories: [...categories, ...[""]]
        }
      }
    })
  }

  addNewSeries(e) {
    const data = this.state.options.xaxis.categories.map(() => 0)

    this.setState({
      series: [...this.state.series, { name: "", data }]
    })
  }

  render() {
    const { classes } = this.props;
    const { series } = this.state
    const { categories } = this.state.options.xaxis

    return (
      <div id="chart" className={classes.chart}>
        <Chart options={this.state.options} series={this.state.series} type="bar" height={350} />

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Chart Labels: </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={classes.chartControl}>
              <div>
                <Typography className={classes.fieldLabel}>Title:</Typography>
                <TextField className={classes.textField} label={this.state.options.title.text} variant="outlined" onBlur={e => this.editTitle(e)} />
              </div>
              <div>
                <Typography className={classes.fieldLabel}>Categories:</Typography>
                <LoopCategories categories={categories} classes={classes} editCategories={this.editCategories} />
                <Fab size="small" color="primary" aria-label="add" className={classes.addDataButton} onClick={() => { this.addNewCategory() }} >
                  <AddIcon />
                </Fab>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Chart Data: </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <LoopSeries categories={categories} classes={classes} series={series} editSeriesTitle={this.editSeriesTitle} editSeriesValues={this.editSeriesValues} />
            <Fab size="small" color="primary" aria-label="add" className={classes.addDataButton} onClick={() => { this.addNewSeries() }} >
              <AddIcon />
            </Fab>
          </ExpansionPanelDetails>
        </ExpansionPanel>

      </div>
    );
  }
}

export default withStyles(styles)(ColumnWithLabels);
import React, { Component } from "react";
import Chart from 'react-apexcharts';
import { LoopSeries, LoopDateCategories } from '../loops';
import { sharedSeriesConfig, sharedOptionsConfig } from '../sharedConfig';
import { addNewSeries, editTitle, editSeriesTitle, editSeriesValues } from '../sharedEventHandlers';

//@material-ui styling
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../classes';


//@material-ui components
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class StackedColumns extends Component {
  constructor() {
    super();

    this.state = {
      ...sharedSeriesConfig(),
      options: {
        ...sharedOptionsConfig(),
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          type: 'datetime',
          categories: [],
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },
    };

    this.addNewSeries = addNewSeries.bind(this);
    this.editTitle = editTitle.bind(this);
    this.editSeriesTitle = editSeriesTitle.bind(this);
    this.editSeriesValues = editSeriesValues.bind(this);
    this.addNewDateCategory = this.addNewDateCategory.bind(this);
    this.editDateCategories = this.editDateCategories.bind(this);
  }


  editDateCategories(date, categoryIndex) {
    if (date !== "") {
      const categoriesCopy = [...this.state.options.xaxis.categories]

      categoriesCopy[categoryIndex] = date.getTime()

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

  addNewDateCategory() {
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
          categories: [...categories, ...[new Date().getTime()]]
        }
      }
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
                <LoopDateCategories categories={categories} classes={classes} editDateCategories={this.editDateCategories} />
                <Fab size="small" color="primary" aria-label="add" className={classes.addDataButton} onClick={() => { this.addNewDateCategory() }} >
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

export default withStyles(styles)(StackedColumns);

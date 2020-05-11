


import React, { Component } from "react";
import Chart from 'react-apexcharts';
import { LoopSeries, LoopDateCategories } from '../shared/loops';
import { sharedSeriesConfig, sharedOptionsConfig } from '../shared/config';
import {
  addNewSeries,
  editTitle,
  editSeriesTitle,
  editSeriesValues,
  editYAxisName,
  editDateCategories,
  addNewDateCategory
} from '../shared/eventHandlers';

//@material-ui styling
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../shared/classes';


//@material-ui components
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class ColumnWithNegatives extends Component {
  constructor() {
    super();

    this.state = {
      ...sharedSeriesConfig(),
      options: {
        ...sharedOptionsConfig(),
        plotOptions: {
          bar: {
            colors: {
              ranges: [{
                from: -100,
                to: -46,
                color: '#F15B46'
              }, {
                from: -45,
                to: 0,
                color: '#FEB019'
              }]
            },
            columnWidth: '80%',
          }
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          title: {
            text: '',
          },
          labels: {
            formatter: function (y) {
              return y.toFixed(0) + "%";
            }
          }
        },
        xaxis: {
          type: 'datetime',
          categories: [],
          labels: {
            rotate: -90
          }
        }
      }
    };

    this.addNewSeries = addNewSeries.bind(this);
    this.editTitle = editTitle.bind(this);
    this.editYAxisName = editYAxisName.bind(this);
    this.editSeriesTitle = editSeriesTitle.bind(this);
    this.editSeriesValues = editSeriesValues.bind(this);
    this.addNewDateCategory = addNewDateCategory.bind(this);
    this.editDateCategories = editDateCategories.bind(this);
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
                <Typography className={classes.fieldLabel}>Y-Axis Title:</Typography>
                <TextField className={classes.textField} label={this.state.options.yaxis.title.text} variant="outlined" onBlur={e => this.editYAxisName(e)} />
              </div>
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

export default withStyles(styles)(ColumnWithNegatives);
import React, { Component } from "react";
import Chart from 'react-apexcharts';
import { LoopSeries, LoopCategories } from '../loops';
import { sharedSeriesConfig, sharedOptionsConfig } from '../sharedConfig';
import { addNewSeries, editCategories, editTitle, editSeriesTitle, editSeriesValues, addNewCategory } from '../sharedEventHandlers';

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

class BasicColumnChart extends Component {
  constructor() {
    super();

    this.state = {
      ...sharedSeriesConfig(),
      options: {
        ...sharedOptionsConfig(),
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
          categories: [],
        },
        yaxis: {
          title: {
            text: ''
          }
        }
      },
    };

    this.addNewSeries = addNewSeries.bind(this);
    this.editCategories = editCategories.bind(this);
    this.editTitle = editTitle.bind(this);
    this.editSeriesTitle = editSeriesTitle.bind(this);
    this.editSeriesValues = editSeriesValues.bind(this);
    this.addNewCategory = addNewCategory.bind(this);
  }

  editYAxisName(e) {
    const { value } = e.target;

    this.setState({
      options: {
        ...this.state.options,
        yaxis: {
          title: {
            text: value
          }
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
                <Typography className={classes.fieldLabel}>Y-Axis Title:</Typography>
                <TextField className={classes.textField} label={this.state.options.yaxis.title.text} variant="outlined" onBlur={e => this.editYAxisName(e)} />
              </div>
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

export default withStyles(styles)(BasicColumnChart);
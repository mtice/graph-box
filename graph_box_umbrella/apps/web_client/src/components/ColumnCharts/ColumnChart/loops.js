import React from 'react'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class LoopCategories extends React.PureComponent {
  render() {
    const { categories, classes, editCategories } = this.props
    return categories.map((category, index) => {
      return (
        <div key={`${category}-${index}`}>
          <TextField className={classes.editTextField} label={category} variant="outlined" onBlur={e => { editCategories(e, index) }} />
        </div>
      )
    });
  }
}

class LoopSeries extends React.PureComponent {
  render() {
    const { categories, series, classes, editSeriesTitle, editSeriesValues } = this.props
    return series.map((series, index) => {
      const name = series.name;

      return (
        <div key={`${name}-${index}`}>
          <Typography className={classes.fieldLabel}>Title:</Typography>
          <TextField className={classes.editTextField} label={name} variant="outlined" onBlur={e => editSeriesTitle(e, name)} />
          <Typography className={classes.fieldLabel}>Values:</Typography>
          <div>
            <LoopSeriesData series={series} categories={categories} classes={classes} editSeriesValues={editSeriesValues} />
          </div>
        </div>
      )
    });
  }
}

class LoopSeriesData extends React.PureComponent {
  render() {
    const { categories, series, classes, editSeriesValues } = this.props
    const amountOfColumns = categories.length;
    const seriesName = series.name;

    let newArray = [];

    for (let x = 0; x < amountOfColumns; x++) {
      let value = series.data[x]
      let fragment = (
        <React.Fragment key={`${value}-${x}`} >
          <TextField label={`${value || ""} (${categories[x]})`} className={classes.valuesTextField} variant="outlined" type="number" size="small" onBlur={e => editSeriesValues(e, x, seriesName)} />
        </React.Fragment >
      )

      newArray.push(fragment);
    }

    return newArray;
  }
}

export { LoopSeries, LoopCategories }
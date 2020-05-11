import { getDate } from '../shared/functions.js';

function addNewSeries(e) {
  const data = this.state.options.xaxis.categories.map(() => 0)

  this.setState({
    series: [...this.state.series, { name: "", data }]
  })
}

function editCategories(e, categoryIndex) {
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

function editTitle(e) {
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

function editYAxisName(e) {
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

function editSeriesTitle(e, seriesName) {
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

function editSeriesValues(e, index, seriesName) {
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

function addNewCategory() {
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


function editDateCategories(date, categoryIndex) {
  if (date !== "") {
    const categoriesCopy = [...this.state.options.xaxis.categories]

    categoriesCopy[categoryIndex] = getDate(date)

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

function addNewDateCategory() {
  const { categories } = this.state.options.xaxis
  const date = getDate()

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
        categories: [...categories, date]
      }
    }
  })
}

export {
  addNewSeries,
  editCategories,
  editTitle,
  editSeriesTitle,
  editSeriesValues,
  addNewCategory,
  editYAxisName,
  editDateCategories,
  addNewDateCategory
};
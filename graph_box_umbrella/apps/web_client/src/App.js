import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import './App.scss';
import BasicColumnChart from './components/ColumnCharts/Basic/index';
import ColumnWithLabels from './components/ColumnCharts/ColumnWithLabels/index';
import StackedColumns from './components/ColumnCharts/StackedColumns/index';
import StackedColumns100 from './components/ColumnCharts/StackedColumns100/index';
import RadarChart from './components/RadarCharts/RadarChart/index';
import Menu from './menu';

function App() {
  return (
    <div className="App">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router>
          <Menu />

          <Switch>
            <Route path="/column-chart">
              <BasicColumnChart />
            </Route>
            <Route path="/column-with-labels">
              <ColumnWithLabels />
            </Route>
            <Route path="/stacked-column">
              <StackedColumns />
            </Route>
            <Route path="/stacked-column-100">
              <StackedColumns100 />
            </Route>
            <Route path="/radar-chart">
              <RadarChart />
            </Route>
          </Switch>
        </Router>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;

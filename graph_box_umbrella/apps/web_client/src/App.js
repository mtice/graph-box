import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.scss';
import BasicColumnChart from './components/ColumnCharts/Basic';
import ColumnWithLabels from './components/ColumnCharts/ColumnWithLabels';
import StackedColumns from './components/ColumnCharts/StackedColumns';
import StackedColumns100 from './components/ColumnCharts/StackedColumns100';
import ColumnWithNegatives from './components/ColumnCharts/ColumnWithNegatives';
import Menu from './menu';

function App() {
  return (
    <div className="App">
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
          <Route path="/column-with-negatives">
            <ColumnWithNegatives />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

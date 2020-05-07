import React from 'react';
import './App.scss';
import BasicColumnChart from './components/ColumnCharts/Basic/index';
import ColumnWithLabels from './components/ColumnCharts/ColumnWithLabels/index';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;

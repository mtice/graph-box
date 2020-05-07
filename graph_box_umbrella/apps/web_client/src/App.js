import React from 'react';
import './App.scss';
import BasicColumnChart from './components/ColumnCharts/ColumnChart/index';
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;

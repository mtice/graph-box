import React from 'react';
import './App.scss';
import BasicColumnChart from './components/ColumnCharts/ColumnChart/index';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* gonna leave this here for future header component */}
      </header>


      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/column-chart">Column Chart</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/column-chart">
              <BasicColumnChart />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

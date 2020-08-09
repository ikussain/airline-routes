import React, { Component } from 'react';
import './App.css';
import data from './data'
import { getAirlineById, getAirportByCode } from './data'

class App extends Component {
  render() {
    const routeTableData = data.routes.map((route, idx) => (
      <tr key={idx}>
        <td>{getAirlineById(route.airline).name}</td>
        <td>{getAirportByCode(route.src).name}</td>
        <td>{getAirportByCode(route.dest).name}</td>
      </tr>
    ))

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Welcome to the app!
          </p>

          <table className="routes-table">
            <thead>
              <tr>
                <th>Airline</th>
                <th>Source</th>
                <th>Destination</th>
              </tr>
            </thead>
            <tbody>
              {routeTableData}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;
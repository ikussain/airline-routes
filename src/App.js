import React, { Component } from 'react';
import './App.css';
import data from './data'

class App extends Component {
  render() {
    const routeTableData = data.routes.map((route) => (
      <tr>
        <td>{route.airline}</td>
        <td>{route.src}</td>
        <td>{route.dest}</td>
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

          <table class="routes-table">
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
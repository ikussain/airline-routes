import React, { Component } from 'react';
import './App.css';
import DATA from './data'
import { getAirlineById, getAirportByCode } from './data'
import Table from './components/Table'

class App extends Component {
  formatData = (property, value) => {
    if (property === 'airline') {
      return getAirlineById(value).name;
    } else {
      return getAirportByCode(value).name;
    }
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'}
    ]

    const routeTableData = DATA.routes.map((route, idx) => (
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

          <Table 
            className="routes-table" 
            columns={columns} 
            rows={DATA.routes}
            format={this.formatData}
          />
        </section>
      </div>
    );
  }
}

export default App;
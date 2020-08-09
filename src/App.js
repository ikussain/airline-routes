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
    ];

    const rows = DATA.routes;

    const PAGE_LIMIT = 25;

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
            rows={rows}
            format={this.formatData}
            perPage={PAGE_LIMIT}
          />
        </section>
      </div>
    );
  }
}

export default App;
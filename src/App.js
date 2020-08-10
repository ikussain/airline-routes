import React, { Component } from 'react';
import './App.css';
import DATA from './data'
import { getAirlineById, getAirportByCode } from './data'
import Table from './components/Table'
import Select from './components/Select'

class App extends Component {
  state = {
    airline: 'all',
    airport: 'all',
  }

  formatData = (property, value) => {
    if (property === 'airline') {
      return getAirlineById(value).name;
    } else {
      return getAirportByCode(value).name;
    }
  }

  handleAirlineSelect = (value) => {
    if (value !== 'all') {
      value = parseInt(value, 10);
    }
    this.setState({ airline: value})
  }

  handleAirportSelect = (value) => {
    this.setState({ airport: value })
  }

  availableAirlines = () => {
    return DATA.airlines
  }

  availableAirports = () => {
    return DATA.airports
  }

  validAirline = (route) => {
    return this.state.airline === 'all' || this.state.airline === route.airline 
  }

  validAirport = (route) => {
    return this.state.airport === 'all' || this.state.airport === route.src || this.state.airport === route.dest
  }

  filterRoutes = () => {
    return DATA.routes.filter((route) => {
      return this.validAirline(route) && this.validAirport(route);
    })
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'}
    ];

    const rows = this.filterRoutes();

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

          <div>
            <Select 
              options={this.availableAirlines()}
              valueKey="id"
              titleKey="name"
              allTitle="All Airlines"
              value={this.state.airline}
              onSelect={this.handleAirlineSelect}
            />
            <Select
              options={this.availableAirports()}
              valueKey="code"
              titleKey="name"
              allTitle="All Airports"
              value={this.state.airport}
              onSelect={this.handleAirportSelect}
            />
          </div>

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
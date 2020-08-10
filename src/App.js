import React, { Component } from 'react';
import './App.css';
import DATA from './data'
import { getAirlineById, getAirportByCode } from './data'
import Table from './components/Table'
import Select from './components/Select'
import Map from './components/Map'

class App extends Component {
  state = {
    airline: 'all',
    airport: 'all',
  };

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
    this.setState({ airline: value});
  }

  handleAirportSelect = (value) => {
    this.setState({ airport: value });
  }

  clearFilters = () => {
    this.setState({
      airport: 'all',
      airline: 'all'
    });
  }

  routesForAirline = (airlineId) => {
    return DATA.routes.filter((route) => (route.airline === airlineId));
  }

  routesForAirport = (airportCode) => {
    return DATA.routes.filter((route) => (route.dest === airportCode || route.src === airportCode));
  }

  availableAirlines = () => {
    if (this.state.airport === 'all') {
      return DATA.airlines;
    } else {
      const airportCode = this.state.airport;
      const airportRoutes = this.routesForAirport(airportCode);
      return DATA.airlines.map((airline) => {
        const disabled = !airportRoutes.some((route) => (route.airline === airline.id));
        return Object.assign({}, airline, { disabled });
      })
    }
  }

  availableAirports = () => {
    if (this.state.airline === 'all') {
      return DATA.airports;
    } else {
      const airlineId = this.state.airline;
      const airlineRoutes = this.routesForAirline(airlineId);
      return DATA.airports.map((airport) => {
        const disabled = !airlineRoutes.some((route) => (route.src === airport.code || route.dest === airport.code));
        return Object.assign({}, airport, { disabled });
      })
    }
  }

  validAirline = (route) => {
    return this.state.airline === 'all' || this.state.airline === route.airline;
  }

  validAirport = (route) => {
    return this.state.airport === 'all' || this.state.airport === route.src || this.state.airport === route.dest;
  }

  filterRoutes = () => {
    return DATA.routes.filter((route) => {
      return this.validAirline(route) && this.validAirport(route);
    })
  }

  buttonDisabled = () => {
    return this.state.airport === 'all' && this.state.airline === 'all';
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'}
    ];

    const routes = this.filterRoutes();
    const availableAirports = this.availableAirports();
    const availableAirlines = this.availableAirlines();

    const PAGE_LIMIT = 25;

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Map 
            routes={routes}
            airports={DATA.airports}
          />

          <div>
            <Select 
              options={availableAirlines}
              valueKey="id"
              titleKey="name"
              allTitle="All Airlines"
              value={this.state.airline}
              onSelect={this.handleAirlineSelect}
            />
            <Select
              options={availableAirports}
              valueKey="code"
              titleKey="name"
              allTitle="All Airports"
              value={this.state.airport}
              onSelect={this.handleAirportSelect}
            />
            <button
              onClick={this.clearFilters}
              disabled={this.buttonDisabled()}
            >
              Show All Routes
            </button>
          </div>

          <Table 
            className="routes-table" 
            columns={columns} 
            rows={routes}
            format={this.formatData}
            perPage={PAGE_LIMIT}
          />
        </section>
      </div>
    );
  }
}

export default App;
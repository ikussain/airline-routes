import React, { Component } from 'react';

export default class extends Component {
  render() {
    console.log(this.props.routes)
    const routeLines = this.props.routes.map((route, idx) => {
      const srcAirport = this.props.airports.find((airport) => (airport.code === route.src));
      const destAirport = this.props.airports.find((airport) => (airport.code === route.dest));

      return (
        <g key={idx}>
          <circle className="source" cx={srcAirport.long} cy={srcAirport.lat}>
            <title></title>
          </circle>
          <circle className="destination" cx={destAirport.long} cy={destAirport.lat}>
            <title></title>
          </circle>
          <path d={`M${srcAirport.long} ${srcAirport.lat} L ${destAirport.long} ${destAirport.lat}`} />
        </g>
      )
    })

    return (
      <svg className="map" viewBox="-180 -90 360 180">
        <g transform="scale(1 -1)">
          <image 
            xlinkHref="equirectangular_world.jpg" 
            href="equirectangular_world.jpg"
            x="-180" y="-90" height="100%"
            transform="scale(1 -1)"
          />
          {routeLines}
        </g>
      </svg>
    )
  }
}
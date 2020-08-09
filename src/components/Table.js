import React, { Component } from 'react';

export default class extends Component {
  static defaultProps = {
    columns: [{name: 'header', property: 'value'}],
    rows: [{id: 1, value: 'cell'}],
    format: (property, value) => value,
    perPage: 25,
    className: "table"
  }

  render() {
    const tableHeader =  this.props.columns.map((column, idx) => (
      <th key={idx}>{column.name}</th>
    ))

    const tableBody = this.props.rows.map((row, idx) => {
      const cols = this.props.columns.map((col) => {
        const value = row[col.property]
        return <td key={col.property}>{ this.props.format(col.property, value) }</td>
      })

      return (
        <tr key={Object.values(row).join('')}>
          {cols}
        </tr>
      )
    })

    return (
      <table className={this.props.className}>
        <thead>
          <tr>
            { tableHeader }
          </tr>
        </thead>
        <tbody>
          { tableBody }
        </tbody>
      </table>
    )
  }
}


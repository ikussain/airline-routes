import React, { Component } from 'react';

export default class extends Component {
  static defaultProps = {
    columns: [{name: 'header', property: 'value'}],
    rows: [{id: 1, value: 'cell'}],
    format: (property, value) => value,
    perPage: 25,
    className: "table"
  }

  state = {
    page: 1,
  };

  numberOfPages = () => {
    return Math.ceil(this.props.rows.length / this.props.perPage);
  }

  prevPage = () => {
    this.setState((state) => (
      { page: Math.max(state.page - 1, 1) }
    ))
  }

  nextPage = () => {
    this.setState((state) => (
      { page: Math.min(state.page + 1, this.numberOfPages() )}
    ))
  }

  render() {
    const start = (this.state.page - 1) * this.props.perPage;

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
    }).slice(start, start + this.props.perPage)

    return (
      <div>
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

      <p>
        {`Showing ${start + 1}-${Math.min(start+ this.props.perPage, this.props.rows.length)} of ${this.props.rows.length} routes.`}
      </p>

      <div className="pagination">
        <button 
          onClick={this.prevPage}
          disabled={this.state.page === 1}
        >
          Previous Page
        </button>
        <button 
        onClick={this.nextPage}
        disabled={this.state.page === this.numberOfPages()}
        >
          Next Page
        </button>
      </div>
      </div>
    )
  }
}


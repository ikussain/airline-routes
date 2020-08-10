import React, { Component } from 'react';

export default class extends Component {
  handleChange = (evt) => {
    const value = evt.target.value;
    this.props.onSelect(value);
  }

  render() {
    const options = this.props.options.map((option) => {
      const title = option[this.props.titleKey]
      const value = option[this.props.valueKey]
      return (<option key={value} value={value}>{title}</option>)
    })

    const defaultOption = (<option value='all' key='all'>{this.props.allTitle}</option>)
    return (
      <select 
        value={this.props.value}
        onChange={this.handleChange}
      >
        { [ defaultOption, ...options ] }
      </select>
    )
  }
}
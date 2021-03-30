import React, {Component} from 'react';

class VariantSelector extends Component {
  render() {
    return (
      <select
        className="Product__option"
        name={this.props.option.name}
        key={this.props.option.name}
        onChange={this.props.handleOptionChange}
      >
        {this.props.option.values.map((value) => {
          if (this.props.availability[value]) {
            return (
              <option value={value} key={`${this.props.option.name}-${value}`}>{`${value}`}</option>
            )
          }
          else {
            return (
              <option disabled value={value} key={`${this.props.option.name}-${value}`}>{`${value}`} (Sold out)</option>
            )
          }
        })}
      </select>
    );
  }
}

export default VariantSelector;

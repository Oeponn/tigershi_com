import React, {Component} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


class VariantSelector extends Component {
  render() {
    return (
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      </DropdownButton>
      /*
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
      </select>*/
    );
  }
}

export default VariantSelector;

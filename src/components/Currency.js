import React, { Component } from 'react';
import CurrencyObject from "./CurrencyObject"

let currencyDefinitions = require("./Definitions").default


export default class Currency extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
      let type = this.props.type;
      let amount = this.props.amount;
      let currencyType = currencyDefinitions[type]
      let image = currencyType.amounts[amount].image
      let width = currencyType.width
      let height = currencyType.height
      let change = this.props.change
      console.log(type)

      return (
          <CurrencyObject change={change} increment={this.props.increment} decrement={this.props.decrement} type={type} image={image} itemWidth={width} itemHeight={height} amount={this.props.quantity}></CurrencyObject>
      )
}
}
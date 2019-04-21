import React, { Component } from "react";

export default class Card extends Component {
  state = {
    value: this.props.card.value,
    suit: this.props.card.suit,
    code: this.props.card.code,
    image: this.props.card.image
  };

  render() {
    return (
      <div className="Card">
        <img src={this.state.image} alt="Card" />
      </div>
    )
  }
}

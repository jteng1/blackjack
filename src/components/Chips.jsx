import React, { Component } from "react";

export default class Chips extends Component {
  
    render() {

    return (
      <div className="chips-container">
        <div className="chipStats">
            <p>Player Chips: {this.props.playerChips.toFixed(2)}</p>
            <p>Bet Amount: {this.props.betAmount.toFixed(2)}</p>
            <p>Chips in Play: {this.props.chipsInPlay.toFixed(2)}</p>
        </div>
      </div>
    )
  }
}

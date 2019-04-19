import React, { Component } from "react";

export default class Stats extends Component {

  render() {
    return (
      <div className="Stats">
        <p>Player Wins: {this.props.playerWins}</p>
        <p>Dealer Wins: {this.props.dealerWins}</p>
        <p>Pushes: {this.props.pushes}</p>
      </div>
    );
  }
}

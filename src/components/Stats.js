import React, { Component } from "react";

export default class Stats extends Component {
  
    render() {

    var totalHands = this.props.playerWins + this.props.dealerWins + this.props.pushes;
    var playerWinPercent = Math.floor(this.props.playerWins/totalHands*100);

    return (
      <div className="Stats">
        <p>Player Win(s): {this.props.playerWins}</p>
        <p>Player Win Percent: {playerWinPercent ? (playerWinPercent) : ("0")}%</p>
        <p>Player Blackjacks: {this.props.playerBlackjacks}</p>
        <p>Dealer Win(s): {this.props.dealerWins}</p>
        <p>Dealer Blackjacks: {this.props.dealerBlackjacks}</p>
        <p>Pushes: {this.props.pushes}</p>
        <p>Total Hands: {totalHands}</p>
      </div>
    );
  }
}

import React, { Component } from "react";

export default class Stats extends Component {
  
    render() {

    var totalHands = this.props.playerWins + this.props.dealerWins + this.props.pushes;
    var playerWinPercent = Math.floor(this.props.playerWins/totalHands*100);
    var dealerWinPercent = Math.floor(this.props.dealerWins/totalHands*100);

    return (
      <div className="stats-container">
        <div className="playerStats">
            <p>Player Wins: {this.props.playerWins}</p>
            <p>Player Win Percentage: {playerWinPercent ? (playerWinPercent) : ("0")}%</p>
            <p>Player Blackjacks: {this.props.playerBlackjacks}</p>
            <p>Player Busts: {this.props.playerBusts}</p>
        </div>
        <div className="gameStats">
            <p>Pushes: {this.props.pushes}</p>
            <p>Total Hands: {totalHands}</p>
        </div>
        <div className="dealerStats">
            <p>Dealer Wins: {this.props.dealerWins}</p>
            <p>Dealer Win Percentage: {dealerWinPercent ? (dealerWinPercent) : ("0")}%</p>
            <p>Dealer Blackjacks: {this.props.dealerBlackjacks}</p>
            <p>Dealer Busts: {this.props.dealerBusts}</p>
        </div>
      </div>
    );
  }
}

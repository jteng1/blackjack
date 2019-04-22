import React, { Component } from "react";

export default class Chips extends Component {
  
    render() {

    return (
      <div className="chips-container">
        <div className="chipStats">
            <p>Player Chips: $ {this.props.playerChips.toFixed(2)}</p>
            <p>Chips in Play: $ {this.props.chipsInPlay.toFixed(2)}</p>
            <p>Win Amount: $ {this.props.winAmount.toFixed(2)}</p>
        </div>
        <div className="chipBets">
            {this.props.playerPlaying === false ? (
                <div className="chipButtons">
                    <button className="sm" onClick={event => this.props.increaseBetOne(event)}>$1</button>
                    <button className="sm" onClick={event => this.props.increaseBetFive(event)}>$5</button>
                    <button className="sm" onClick={event => this.props.increaseBetTen(event)}>$10</button>
                    <button className="sm" onClick={event => this.props.increaseBetTwentyFive(event)}>$25</button>
                    <button className="sm" onClick={event => this.props.clearBets(event)}>Clear Bets</button>
                </div>
            ) : (
                ""
            )}
            <p>Bet Amount: $ {this.props.betAmount.toFixed(2)}</p>
        </div>
      </div>
    )
  }
}

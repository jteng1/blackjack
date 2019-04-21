import React, { Component } from "react";

export default class Chips extends Component {
  
    render() {

    return (
      <div className="chips-container">
        <div className="chipStats">
            <p>Player Chips: {this.props.playerChips}</p>
            <p>Bet Amount: {this.props.betAmount}</p>
        </div>
      </div>
    );
  };
};
